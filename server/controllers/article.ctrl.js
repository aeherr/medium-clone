const Article = require('./../models/Article')
const User = require('./../models/User')
const cloudinary = require('cloudinary')

module.exports = {
    addArticle: (req, res, next) => {
        let { text, title, claps, description } = req.body
        if (!text || !title) {
            res.status(400).send("Please give your article a title and content")
            return next()
        }
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, result => {
                if (result.error) {
                    res.send(result.error.http_code || 400)
                    return next()
                }
                let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' }
                saveArticle(obj)
            }, {
                resource_type: 'image',
                eager: [
                    { effect: 'sepia' }
                ]
            })
        } else {
            saveArticle({ text, title, claps, description, feature_img: '' })
        }
        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)  { res.send(err) }
                else if (!article) { res.send(400) }
                else {
                    return article.addAuthor(req.body.author_id).then(_article => {
                        return res.send(_article)
                    })
                }
                next()
            })
        }
    },
    getAll: (req, res, next) => {
        Article.find()
        .populate('author')
        .populate('comments.author')
        .exec((err, articles) => {
            if (err) res.send(err)
            else if(!articles) res.send(404)
            else res.send(articles)
            next()
        })
    },
    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then(article => {
            return article.clap(req.body.count || 1).then(_ => res.json({ msg: "Done" }))
        })
        .catch(next)
    },
    commentArticle: (req, res, next) => {
        if (!req.body.comment) {
            res.status(400).send("Please add a comment")
            return next()
        }
        Article.findById(req.body.article_id).then(article => {
            return article.comment({
                author: req.body.author_id,
                text: req.body.comment
            })
            .then(savedArticle => {
                var comment = savedArticle.comments[savedArticle.comments.length -1]
                User.findById(comment.author).then(user => {
                    comment.author = user
                    res.json(comment)
                }).catch(next)
            })
            .catch(next)
        })
    },
    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
        .populate('author')
        .populate('comments.author')
        .exec((err, article) => {
            if (err) res.send(err)
            else if (!article) res.send(404)
            else res.send(article)
            next()
        })
    }
}

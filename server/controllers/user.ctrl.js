const Article = require('./../models/Article')
const User = require('./../models/User')

module.exports = {
    fetchOrAdd: (req, res, next) => {
        User.findOne({'provider_id': req.body.provider_id}).then((user, err) => {
            if (!err && user) {
                //found a user
                res.send(user)
                return next()
            }
            //User not found, make a new one
            new User(req.body).save((err, newUser) => {
                if (err)
                    res.send(err)
                else if (!newUser)
                    res.send(400)
                else
                    res.send(newUser)
                next()
            });
        })
    },

    getUser: (req, res, next) => {
        User.findById(req.params.id)
        .then((err, user) => {
            if (err) res.send(err)
            else if (!user) res.send(404)
            else res.send(user)
            next()
        })
    },
    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({msg: "followed"})
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return User.find({'following': req.params.id}).then((_users)=>{
                _users.forEach((user_)=>{
                    _user.addFollower(user_)
                })
                return Article.find({'author': req.params.id}).then((_articles)=> {
                    return res.json({ user: _user, articles: _articles })
                })
            })
        }).catch((err)=>console.error(err))
    }
}

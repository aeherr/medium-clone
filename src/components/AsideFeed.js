import React, { Component } from 'react'

class AsideFeed extends Component {
    render () {
        const authors = this.props.articles
            .map((article)=> {
                    return article.author
                }
            )
            .sort()
            .filter((a, i, self)=>{
                return self.findIndex(b => b._id === a._id) === i
            })
            .map((author)=>
                <a className="tag" key={author._id} href={`/profile/${author._id}`}>{author.name}</a>
            )
        const top_articles = this.props.articles.map((article, i) =>
            <li className="top-stories-list-item" key={article._id}>
                <div className="count-button-wrapper">
                    <span className="count-button">{i + 1}</span>
                </div>
                <div className="top-stories-links">
                    <a className="post-title" href={`/articleview/${article._id}`}>{article.title}</a><br/>
                    <small>
                        <div data-react-class="PopoverLink" data-react-props="">
                        <span className="popover-link" data-reactroot="">
                            <a href={`/profile/${article.author._id}`}>{article.author.name}</a>
                        </span>
                        </div>
                    </small>
                </div>
            </li>
        )
        return (
            <div>
                <aside className="col-md-4 main-sidebar">
                    <h4 className="small-heading border-top">Featured Authors</h4>
                    <div data-react-class="TagList" data-react-props="">
                        <div className="tags-wrapper" data-reactroot="">
                            {authors}
                        </div>
                    </div>


                    <h4 className="small-heading border-top">Top stories</h4>
                    <div className="sidebar-top-stories">
                        <ul>
                            {top_articles}
                        </ul>
                    </div>
                </aside>
            </div>
        )
    }
}
export default AsideFeed

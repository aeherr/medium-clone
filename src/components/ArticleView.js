import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getArticle, clap,follow } from './../redux/actions/actions'
import FollowButton from './FollowButton'

const mapStateToProps = state => {
    return {
        article: state.articles.article,
        user: state.authUser.user
    }
}

class ArticleView extends Component {
    componentDidMount() {
        document.body.className = 'posts show'
    }

    componentWillMount() {
        this.props.getArticle(this.props.match.params.id)
    }

    componentWillUnmount() {
        document.body.className= ''
    }

    render() {
        const { text, claps, title, feature_img, author } = this.props.article
        let author_name, author_img, author_id
        if (author) {
            author_name = author.name
            author_id = author.id
            author_img = author.provider_pic
        }

        return (
            <div>
            <div className="container-fluid main-container">
            <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">
                    <div className="pull-right">
                        {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
                    </div>
                    <div className="post-metadata">
                        <img alt={author_name} className="avatar-image" src={author_img} height="40" width="40" />
                        <div className="post-info">
                            <div data-react-class="PopoverLink" data-react-props=""><span className="popover-link" data-reactroot=""><a href={`/profile/${author_id}`}>{author_name}</a></span></div>
                            <small>Published • nice story</small>
                        </div>
                    </div>

                    {!feature_img || !feature_img.length > 0 ? '' : <div className="post-picture-wrapper">
                        <img src={feature_img} alt="feature img 540" />
                    </div> }
                    <h3 className="title">{title}</h3>
                    <div className="body">
                        <p></p>
                        <p className=""dangerouslySetInnerHTML={{__html: text}}>
                        </p>
                        <p></p>
                    </div>
                    <div className="post-tags">
                        <button className="tag">Story</button>
                        <button className="tag">Community</button>
                    </div>
                    <div className="post-stats clearfix">
                        <div className="pull-left">
                            <div className="like-button-wrapper">
                                <button onClick={() => this.props.clap(this.props.article._id)} className="like-button" data-behavior="trigger-overlay" type="submit">
                                <i className="fa fa-heart-o"></i><span className="hide-text">Like</span>
                                </button>
                                 <span className="like-count">{claps}</span>
                            </div>
                        </div>
                        <div className="pull-left">
                            <button className="response-icon-wrapper">
                                <i className="fa fa-comment-o"></i>
                                <span className="response-count" data-behavior="response-count">0</span>
                            </button>
                        </div>
                        <div className="pull-right">
                            <div className="bookmark-button-wrapper">
                                <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="author-info">
                        <div clas="author-metadata">
                            <img alt={author_name} className="avatar-image" src={author_img} height="50" width="50" />
                            <div className="username-description">
                                <h4>{author_name}</h4>
                                <p></p>
                            </div>
                        </div>
                        {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
                    </div>
                </div>
            </div>
            <div className="post-show-footer row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                <div className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content related-stories">
                    <h4 className="small-heading">Related stories</h4>
                    <div className="post-list-item">
                        <div className="flex-container">
                            <div className="avatar-wrapper">
                                <img alt="" className="avatar-image" src="" height="40" width="40" />
                            </div>
                            <div className="post-info">
                                <strong className="pli-title"><button></button></strong><br/>
                                <small className="pli-username"><button></button></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="responses" className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content">
                    <h4 className="small-heading">Responses</h4>
                    <div data-behavior="responses-list">
                    </div>
                </div>
            </div>
            <div className="post-metadata-bar" data-page="post-metadata-bar">
                <div className="flex-container is-inView" data-behavior="animated-metadata">
                    <div className="post-stats flex-container">
                        <div className="like-button-wrapper">
                            <button className="like-button" data-behavior="trigger-overlay" onClick={() => this.props.clap(this.props.article._id)}>
                                <i className="fa fa-heart-o"></i><span className="hide-text">Like</span>
                            </button>
                            <span className="like-count">{claps}</span>
                        </div>

                        <div>
                            <a className="response-icon-wrapper" href="#">
                                <i className="fa fa-comment-o"></i>
                                <span className="response-count" data-behavior="response-count">0</span>
                            </a>
                        </div>
                        <div className="bookmark-button">
                            <div className="bookmark-button-wrapper">
                                <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="metabar-author-info flex-container flex-space-btw">
                        <div>
                            <img alt={author_name} className="avatar-image" src={author_img} height="35" width="35" />
                            <div data-react-class="PopoverLink" ><span className="popover-link" data-reactroot=""><a href={`/profile/${author_id}`}>{author_name}</a></span></div>
                        </div>
                        <div data-react-class="UserFollowButton" >
                            {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, {getArticle, clap, follow})(ArticleView)

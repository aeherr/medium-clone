import  React, { Component } from 'react';

/** Author picture and name, with and optional note*/
export default class AuthorInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="post-metadata">
                <img alt={this.props.author.name} className="avatar-image" src={this.props.author.provider_pic} height="40" width="40" />
                <div className="post-info">
                    <div data-react-class="PopoverLink" data-react-props=""><span className="popover-link" data-reactroot=""><a href={`/profile/${this.props.author.id}`}>{this.props.author.name}</a></span></div>
                    { this.props.note ? <small>{this.props.note}</small> : '' }
                </div>
            </div>
        )
    }
}


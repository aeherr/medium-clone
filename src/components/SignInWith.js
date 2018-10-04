import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { signInUser, toggleClose, toggleOpen } from './../redux/actions/actions'

class SignInWith extends Component {
    render() {
    const responseGoogle = (res) => {
        let postData = {
            name: res.w3.ig,
            provider: 'google',
            email: res.w3.U3,
            provider_id: res.El,
            token: res.Zi.access_token,
            provider_pic: res.w3.Paa
        }
        // build our user data
        this.props.signInUser(postData)
        this.props.toggleClose()
    }
        return (
            <div>
                <div data-behavior="overlay" className={this.props.modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
                    <button onClick={this.props.toggleClose} data-behavior="close-overlay" type="button" className="overlay-close"><span className="glyphicon glyphicon-remove"></span></button>
                    <nav>
                        <h2 className="grayed-heading center">Sign In</h2>
                        <ul className="omniauth-button-group">
                            <li className="omniauth-button google">
                                <GoogleLogin className="button google"
                                clientId="773019502617-kjcec9mai8dd6fr07j17u3ma8etf20al.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} >
                                    <i className="fa fa-google"></i><span> Sign In with Google</span>
                                </GoogleLogin>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode
    }
}
export default connect(mapStateToProps, { toggleClose, toggleOpen, signInUser })(SignInWith)

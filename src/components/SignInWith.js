import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { signInUser, toggleClose, toggleOpen } from './../redux/actions/actions'

class SignInWith extends Component {
    render() {
        const responseGoogle = (res) => {
            if(!res || !res.profileObj) return alert('Sorry! Something went wrong')
            let postData = {
                name: res.profileObj.name,
                provider: 'google',
                email: res.profileObj.email,
                provider_id: res.profileObj.googleId,
                token: res.access_token,
                provider_pic: res.profileObj.imageUrl
            }
            // build our user data
            this.props.signInUser(postData)
            this.props.toggleClose()
        }

        const responseFacebook = (res) => {
            let postData = {
                name: res.name,
                provider: 'facebook',
                email: res.email,
                provider_id: res.userID,
                token: res.accessToken,
                provider_pic: res.picture  && res.picture.data ? res.picture.data.url : undefined
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
                            <li className="omniauth-button facebook">
                                <FacebookLogin
                                    appId="286265425318766"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} className="button facebook"><i className="fa fa-facebook"></i>Sign In with Facebook</button>
                                      )}/>
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

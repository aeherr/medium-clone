import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function(Comp) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.isAuth) this.content.router.history.push('/')
        }
        render() {
            return <Comp {...this.props} />
        }
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = state => { return { isAuth: state.authUser.isAuth } }

    return connect(mapStateToProps)(Authenticate)
}

import React, { Component } from "react"
import { connect } from "react-redux"
import { logout } from "../../store/actions/auth"

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <div />
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(null, mapDispatchToProps)(Logout)

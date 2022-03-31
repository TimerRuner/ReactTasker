import React, { Component } from "react"
import MenuToggle from "../components/Navigation/MenuToggle"
import Drawer from "../components/Navigation/Drawer/Drawer"
import { connect } from "react-redux"

class Layout extends Component {
    state = {
        menu: false,
    }

    toggleMenuHandler = () => {
        this.setState((prev) => ({
            ...this.state,
            menu: !prev.menu,
        }))
    }

    menuCloseHandler = () => {
        this.setState({
            ...this.state,
            menu: false,
        })
    }
    render() {
        return (
            <div className="Layout">
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>{this.props.children}</main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

export default connect(mapStateToProps, null)(Layout)

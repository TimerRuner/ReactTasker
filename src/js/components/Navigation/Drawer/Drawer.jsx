import React, { Component } from "react"
import Backdrop from "../../../UI/Backdrop"
import { NavLink } from "react-router-dom"

class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeclassname={"active"}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = ["Drawer"]
        if (!this.props.isOpen) {
            cls.push("close")
        }

        const links = [{ to: "/", label: "Список", exact: "true" }]

        if (this.props.isAuthenticated) {
            links.push(
                {
                    to: "/quiz-creator",
                    label: "Створити тест",
                    exact: "false",
                },
                {
                    to: "/logout",
                    label: "Вийти",
                    exact: "false",
                }
            )
        } else {
            links.push({ to: "/auth", label: "Авторизація", exact: "false" })
        }

        return (
            <React.Fragment>
                {this.props.isOpen ? (
                    <Backdrop onClick={this.props.onClose} />
                ) : null}
                <nav className={cls.join(" ")}>
                    <ul>{this.renderLinks(links)}</ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer

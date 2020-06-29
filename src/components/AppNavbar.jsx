import React, { Component, Fragment } from "react";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  NavbarBrand,
} from "reactstrap";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const loggedInLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            Welcome, <strong>{user && user.name}</strong>!
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const loggedOutLinks = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar className="mb-3" color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/">shopping list</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? loggedInLinks : loggedOutLinks}
                <NavItem>
                  <NavLink href="https://github.com/danlopes-arc">
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AppNavbar);

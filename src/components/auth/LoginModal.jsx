import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  NavLink,
  Alert,
} from "reactstrap";
import { LOGIN_FAIL } from "../../actions/types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorsActions";

export class LoginModal extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { errors, auth } = this.props;

    if (errors !== prevProps.errors) {
      if (errors.id === LOGIN_FAIL) {
        this.setState({ msg: errors.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal && auth.isAuthenticated) {
      this.toggle()
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const user = { email, password };

    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  onChange={this.onChange}
                  autoFocus
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="name">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  onChange={this.onChange}
                  autoFocus
                ></Input>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  login,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

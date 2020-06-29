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
import { REGISTER_FAIL } from "../../actions/types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorsActions";

export class RegisterModal extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { errors, auth } = this.props;

    if (errors !== prevProps.errors) {
      if (errors.id === REGISTER_FAIL) {
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
    const { name, email, password } = this.state;

    const user = { name, email, password };

    this.props.register(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  onChange={this.onChange}
                  autoFocus
                ></Input>
              </FormGroup>
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
                  Register
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
  register,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);

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
} from "reactstrap";
import { addItem } from "../actions/itemsActions";

export class ItemModal extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };

  state = {
    modal: false,
    item: {
      id: "",
      name: "",
    },
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      item: {
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.addItem({
      ...this.state.item
    });

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          className="mb-3"
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          autoFocus={false}
        >
          <ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                  autoFocus
                ></Input>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  color="dark"
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);

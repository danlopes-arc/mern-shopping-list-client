import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Alert } from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemsActions";
import PropTypes from "prop-types";
import ItemModal from "../components/ItemModal";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { list: items } = this.props.items;
    const { isAuthenticated } = this.props.auth;

    return (
      <Container>
        {isAuthenticated ? (
          <ItemModal />
        ) : (
          <Alert color="info">Login to add or remove items</Alert>
        )}
        <ListGroup>
          {/* <TransitionGroup className="shopping-list"> */}
          {items.map(({ _id: id, name }) => (
            // <CSSTransition key={id} timeout={0}>
            <ListGroupItem key={id}>
              {isAuthenticated ? (
                <Button
                  className="remove-btn mr-2"
                  color="danger"
                  size="sm"
                  onClick={() => this.onDeleteClick(id)}
                >
                  &times;
                </Button>
              ) : (
                ""
              )}
              {name}
            </ListGroupItem>
            // </CSSTransition>
          ))}
          {/* </TransitionGroup> */}
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);

import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
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
    return (
      <Container>
        <ItemModal />
        <ListGroup>
          {/* <TransitionGroup className="shopping-list"> */}
          {items.map(({ _id: id, name }) => (
            // <CSSTransition key={id} timeout={0}>
            <ListGroupItem>
              <Button
                className="remove-btn mr-2"
                color="danger"
                size="sm"
                onClick={() => this.onDeleteClick(id)}
              >
                &times;
              </Button>
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
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);

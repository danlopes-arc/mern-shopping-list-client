import React, {Component} from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";

import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;

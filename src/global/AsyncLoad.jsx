import React, { Component } from "react";

// A component class to load async data and pass it as render prop

/**
 * Required Props:
 * 1. `promise` : A promise which needs to be resolved
 * 2. `LoadComponent` : A component class which is shown while loading
 */
export default class AsyncLoad extends Component {
  constructor(props) {
    super(props);
    this.state = { done: false, error: null, data: null };
  }

  componentDidMount() {
    let { promise } = this.props;
    promise
      .then((result) => {
        this.setState({ ...this.state, done: true, data: result });
      })
      .catch((err) => this.setState({ ...this.state, done: true, error: err }));
  }

  render() {
    let { done, data, error } = this.state;
    let { children, LoadComponent } = this.props;

    if (!done) {
      return <LoadComponent />;
    }
    return children(data, error);
  }
}

import PropTypes from "prop-types";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};

ErrorBoundary.defaultProps = {
  children: null,
};

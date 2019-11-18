import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

const QUERY_DELAY = 500;

class DebounceField extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  invokeDebounced = debounce(() => {
    const { callback } = this.props;
    const { value } = this.state;
    if (callback) callback(value);
  }, QUERY_DELAY);

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.invokeDebounced();
  };

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  render() {
    // make sure value is not undefined before passing to View
    const { callback, value = '', ...props } = this.props;
    return <View {...{ value }} {...props} {...this.state} onChange={this.handleChange} />;
  }
}

const View = props => <input {...props} />;

export default DebounceField;

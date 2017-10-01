import React from 'react';
import style from './style.pcss';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        value: this.state.value + this.props.increment,
      });
    }, 1000);
  }

  render() {
    return (
      <div className={`${style.hello_world}`}>
        <div className={style.stuff}>{this.state.value} : counter zxc</div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }
  }
}

component.defaultProps = {
  increment: 123,
};
export default component;

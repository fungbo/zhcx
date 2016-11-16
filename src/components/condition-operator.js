import React from 'react';

export default class Operator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {checked: false}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.label != this.props.label) {
      this.setState({checked: false});
    }
  }

  remove = () => {
    if (this.props.remove) {
      this.props.remove(this.props.index);
    }
  };

  check = (ev) => {
    this.setState({checked: ev.target.checked});

    if (this.props.check) {
      this.props.check(this.props.index, ev.target.checked);
    }
  };

  up = () => {
    if (this.props.up) {
      this.props.up(this.props.index);
    }
  };

  down = () => {
    if (this.props.down) {
      this.props.down(this.props.index);
    }
  };

  render() {
    let style = {
      border: 'none', backgroundColor: 'transparent', padding: '0'
    };

    let delStyle = {
      ...style,
      color: 'red'
    };

    if (this.props.show) {
      return (
        <span>
        <button style={style} onClick={this.up}>
          <span className="glyphicon glyphicon-chevron-up"/>
        </button>
          {' '}
          <button style={style} onClick={this.down}>
          <span className="glyphicon glyphicon-chevron-down"/>
        </button>
          {' '}
          <button style={delStyle} onClick={this.remove}>
          <span className="glyphicon glyphicon-remove"/>
        </button>
          {' '}
          <input type="checkbox" checked={this.state.checked} onChange={this.check}/>
      </span>
      )
    } else {
      return null;
    }
  }
}

Operator.defaultProps = {
  show: true
};


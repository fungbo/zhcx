import React, {PropTypes, Component} from 'react';

export default class OutputOperator extends Component {

  moveLeft = (ev) => {
    ev.preventDefault();
    this.props.moveLeft(this.props.index);
  };

  moveRight = (ev) => {
    ev.preventDefault();
    this.props.moveRight(this.props.index);
  };

  render() {
    let style = {
      border: 'none', backgroundColor: 'transparent', padding: '0',
      fontSize: 'smaller'
    };

    return <span>
      <button style={style} onClick={this.moveLeft}>
        <span className="glyphicon glyphicon-chevron-left"/>
      </button>
      <button style={style} onClick={this.moveRight}>
        <span className="glyphicon glyphicon-chevron-right"/>
      </button>
    </span>
  }
}

OutputOperator.propTypes = {
  index: PropTypes.number.isRequired,
  moveLeft: PropTypes.func.isRequired,
  moveRight: PropTypes.func.isRequired
};

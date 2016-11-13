import React from 'react';
import {Table} from 'react-bootstrap';

export default class Cxjg extends React.Component {
  constructor(props) {
    super(props);

  }

  renderRow = (row, rowIndex) => {
    let keys = Object.keys(row);
    return <tr key={rowIndex}>
      <td>{rowIndex + 1}</td>
      {
        keys.map((key, index) => {
          return <td key={index}>{row[key]}</td>
        })
      }
    </tr>
  };

  renderTbody = () => {
    return <tbody>
    {
      this.props.result.map((row, index) => {
        return this.renderRow(row, index);
      })
    }
    </tbody>;
  };

  renderTHead = () => {
    let style = {
      whiteSpace: 'nowrap',
      backgroundColor: '#f5f5f5',
      fontSize: 'smaller',
      padding: 0,
      paddingLeft: '5px',
      paddingRight: '5px'
    };

    return <thead>
    <tr>
      <th style={style}>No.</th>
      {
        this.props.head.map((col, index) => {
          return <th key={index} style={style}>{col.split('-')[1]}</th>
        })
      }
    </tr>
    </thead>
  };

  render() {
    return (
      <div className="cxjg" style={{height: '400px', overflow: 'auto'}}>
        <Table striped bordered responsive condensed hover>
          {this.renderTHead()}
          {this.renderTbody()}
        </Table>
      </div>
    )
  }
}

Cxjg.propTypes = {
  head: React.PropTypes.array.isRequired,
  result: React.PropTypes.array.isRequired
};



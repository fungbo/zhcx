import React from 'react';
import {Table, Pagination, FormControl, Button, InputGroup} from 'react-bootstrap';


let style = {
  whiteSpace: 'nowrap',
  backgroundColor: '#f5f5f5',
  fontSize: 'smaller',
  padding: 0,
  paddingLeft: '5px',
  paddingRight: '5px'
};


export default class Cxjg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      activePage: 1,
      activeMaxNum: 30,
      currentMaxNum: 30
    };
  }

  renderRow = (row, rowIndex) => {
    let keys = Object.keys(row);
    return <tr key={rowIndex}>
      <td>{rowIndex + 1}</td>
      {
        keys.map((key, index) => {
          return <td key={index}>{row[key] === null ? 'Null' : row[key]}</td>
        })
      }
    </tr>
  };

  renderTbody = () => {
    return <tbody>
    {
      this.props.data.result.map((row, index) => {
        return this.renderRow(row, index);
      })
    }
    </tbody>;
  };

  renderNo = () => {
    if (this.props.head.length === 0) {
      return null;
    } else {
      return <th style={style}>No.</th>
    }
  };

  renderTHead = () => {
    return <thead>
    <tr>
      {this.renderNo()}
      {
        this.props.head.map((col, index) => {
          return <th key={index} style={style}>{col.split('-')[1]}</th>
        })
      }
    </tr>
    </thead>
  };

  getMaxPageNum = () => {
    return Math.ceil(this.props.data.count / this.state.activeMaxNum);
  };

  getMaxButtons = () => {
    let maxButtons = Math.ceil(this.props.data.count / this.state.activeMaxNum);
    return maxButtons > 5 ? 5 : maxButtons;
  };

  handleSelect = (eventKey) => {
    this.setState({activePage: eventKey});
  };

  inputPageNum = (ev) => {
    let maxPageNum = Math.ceil(this.props.data.count / this.state.activeMaxNum);
    let value = parseInt(ev.target.value) > maxPageNum ? maxPageNum : parseInt(ev.target.value);
    this.setState({currentPage: value});
  };

  inputMaxNum = (ev) => {
    let value = parseInt(ev.target.value) > 300 ? 300 : parseInt(ev.target.value);
    this.setState({currentMaxNum: value});
  };

  jumpTo = () => {
    this.setState({activePage: this.state.currentPage});
  };

  changeMaxNum = () => {
    this.setState(
      {
        activeMaxNum: this.state.currentMaxNum,
        currentPage: 1,
        activePage: 1
      });
  };

  renderPaginator = () => {
    if (this.props.data.result.length !== 0) {
      return null;
    } else {
      return <div>
        <Pagination style={{display: 'inline'}}
                    prev next first last ellipsis boundaryLinks
                    items={this.getMaxPageNum()}
                    maxButtons={this.getMaxButtons()}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect}/>
        {' '}
        <InputGroup style={{width: '70px'}}>
          <InputGroup.Addon>页码</InputGroup.Addon>
          <FormControl style={{width: '70px'}} type='number' value={this.state.currentPage}
                       onChange={this.inputPageNum}/>
          {' '}
          <InputGroup.Button>
            <Button bsStyle='primary' onClick={this.jumpTo}>GO</Button>
          </InputGroup.Button>

          <InputGroup.Addon>每页</InputGroup.Addon>
          <FormControl style={{width: '70px'}} type='number'
                       value={this.state.currentMaxNum}
                       onChange={this.inputMaxNum}/>
          {' '}
          <InputGroup.Button>
            <Button bsStyle='primary' onClick={this.changeMaxNum}>刷新</Button>
          </InputGroup.Button>
        </InputGroup>
        {' '}
      </div>
    }
  };

  render() {
    return (
      <div className='cxjg' style={{height: '400px', overflow: 'auto'}}>
        <Table striped bordered responsive condensed hover>
          {this.renderTHead()}
          {this.renderTbody()}
        </Table>

        {this.renderPaginator()}
      </div>
    )
  }
}

Cxjg.propTypes = {
  head: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired
};



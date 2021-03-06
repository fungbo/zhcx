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
      currentMaxNum: 30
    };
  }

  renderRow = (row, rowIndex) => {
    let keys = Object.keys(row);
    return <tr key={rowIndex}>
      <td>{rowIndex + 1}</td>
      {
        keys.map((key, index) => {
          if (index === keys.length - 1) {
            return null;
          } else {
            return <td key={index}>{row[key] === null ? 'Null' : row[key]}</td>
          }
        })
      }
    </tr>
  };

  renderTbody = () => {
    return <tbody>
    {
      this.props.result.data.map((row, index) => {
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

  handleClickHead = (ev, head) => {
    ev.preventDefault();

    let value = this.props.sortHead[head];
    let sortHead = Object.assign({}, this.props.sortHead);

    if (value === undefined) {
      sortHead[head] = 1;
    } else if (value === 1) {
      sortHead[head] = 2;
    } else if (value === 2) {
      delete sortHead[head];
    }

    this.props.setSortHead(sortHead);
  };

  renderSortArrow = (head) => {
    let value = this.props.sortHead[head];

    if (value === 1) {
      return <span className="glyphicon glyphicon-arrow-up"/>
    } else if (value === 2) {
      return <span className="glyphicon glyphicon-arrow-down"/>
    }

    return null;
  };

  renderTHead = () => {
    let linkStyle = {
      textDecoration: "none"
    };

    return <thead>
    <tr>
      {this.renderNo()}
      {
        this.props.head.map((col, index) => {
          return <th key={index} style={style}>
            <a style={linkStyle} href="#" onClick={(ev) => this.handleClickHead(ev, col)}>
              {col.split('-')[1]}
            </a>
            {this.renderSortArrow(col)}
          </th>
        })
      }
    </tr>
    </thead>
  };

  getMaxPageNum = () => {
    return Math.ceil(this.props.result.count / this.props.activeMaxNum);
  };

  getMaxButtons = () => {
    let maxButtons = Math.ceil(this.props.result.count / this.props.activeMaxNum);
    return maxButtons > 5 ? 5 : maxButtons;
  };

  handleSelect = (eventKey) => {
    this.props.setActivePage(eventKey);
    this.props.sendRequest();
  };

  inputPageNum = (ev) => {
    let maxPageNum = Math.ceil(this.props.result.count / this.props.activeMaxNum);
    let value = parseInt(ev.target.value) > maxPageNum ? maxPageNum : parseInt(ev.target.value);
    this.setState({currentPage: value});
  };

  inputMaxNum = (ev) => {
    let value = parseInt(ev.target.value) > 300 ? 300 : parseInt(ev.target.value);
    this.setState({currentMaxNum: value});
  };

  jumpTo = () => {
    this.props.setActivePage(this.state.currentPage);
    this.props.sendRequest();
  };

  changeMaxNum = () => {
    this.setState({currentPage: 1,});
    this.props.setActiveMaxNum(this.state.currentMaxNum);
    this.props.setActivePage(1);
    this.props.sendRequest();
  };

  renderExportBtn = () => {
    if (this.props.result.data.length === 0) {
      return null;
    } else {
      return <Button bsStyle="success" style={{marginTop: "20px"}}
                     onClick={ev => this.props.exportExcel(undefined, '/zhcx-excel/')}>导出CSV</Button>
    }
  };

  renderPaginator = () => {
    if (this.props.result.data.length === 0) {
      return null;
    } else {
      return <div>
        <Pagination style={{display: 'inline'}}
                    prev next first last ellipsis boundaryLinks
                    items={this.getMaxPageNum()}
                    maxButtons={this.getMaxButtons()}
                    activePage={this.props.activePage}
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
        {' '}
        {this.renderExportBtn()}
      </div>
    )
  }
}

Cxjg.propTypes = {
  activeMaxNum: React.PropTypes.number.isRequired,
  activePage: React.PropTypes.number.isRequired,
  head: React.PropTypes.array.isRequired,
  sortHead: React.PropTypes.object.isRequired,
  result: React.PropTypes.object.isRequired,
  setActivePage: React.PropTypes.func.isRequired,
  setActiveMaxNum: React.PropTypes.func.isRequired,
  sendRequest: React.PropTypes.func.isRequired,
  exportExcel: React.PropTypes.func.isRequired,
  setSortHead: React.PropTypes.func.isRequired
};



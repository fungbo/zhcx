import React from 'react';
import {Form, FormGroup, ControlLabel, ButtonGroup, Button, Well, Table, Modal} from 'react-bootstrap';
import Add from './add';
import OutputFilter from './output-filter';
import Tree from './tree';
import update from 'react-addons-update';
import OutputOperator from './output-operator';
import axios from 'axios';

class Cxtj extends React.Component {
  constructor(props) {
    super(props);

    this.defaultModal = {
      show: false,
      title: '',
      msg: ''
    };

    this.state = {
      head: [],
      conditions: [],
      checkedList: [],
      modal: this.defaultModal
    };
  }

  closeAdd = () => {
    this.setState({showAddModal: false});
  };

  closeOutputFilter = () => {
    this.setState({showOutputFilterModal: false});
  };

  addCondition = (value) => {
    let conditions = this.state.conditions.slice();
    conditions.push({name: value});

    this.setState({conditions: conditions})
  };

  removeCondition = (index) => {
    this.setState({
      conditions: update(this.state.conditions, {$splice: [[index, 1]]})
    })
  };

  checkCondition = (index, checked) => {
    let checkedList = this.state.checkedList.slice();

    if (checked) {
      if (checkedList.indexOf(index) == -1) {
        checkedList.push(index);
      }
    } else {
      checkedList.splice(checkedList.indexOf(index), 1);
    }

    this.setState({checkedList: checkedList});
  };

  combineConditions = () => {
    if (this.state.checkedList.length < 2) {
      return;
    }

    let leftItems = [];
    let combinedItems = [];
    this.state.conditions.map((condition, index) => {
      if (this.state.checkedList.indexOf(index) == -1) {
        leftItems.push(this.state.conditions[index]);
      } else {
        combinedItems.push(this.state.conditions[index]);
      }
    });

    let complexItem = {name: '复合条件', children: combinedItems};
    leftItems.push(complexItem);

    this.setState({
      checkedList: [],
      conditions: leftItems
    })
  };

  upCondition = (index) => {
    if (index == 0) {
      return;
    }

    let conditions = this.state.conditions;
    let item = conditions.splice(index, 1);
    conditions.splice(index - 1, 0, ...item);

    this.setState({conditions: conditions});
  };

  downCondition = (index) => {
    if (index == this.state.conditions.length - 1) {
      return;
    }

    let conditions = this.state.conditions;
    let item = conditions.splice(index, 1);
    conditions.splice(index + 1, 0, ...item);

    this.setState({conditions: conditions});
  };

  separateCondition = () => {
    let conditions = [];
    this.state.conditions.map((condition) => {
      if (condition.name == '复合条件') {
        condition.children.map((child) => {
          conditions.push(child);
        })
      } else {
        conditions.push(condition);
      }
    });

    this.setState({conditions: conditions});
  };

  setOutput = (output) => {
    let ry = output.ry;
    let sy = output.sy;
    let by = output.by;
    let combinedOutput = Object.assign({}, ry, sy, by);

    let head = [];
    for (let property in combinedOutput) {
      if (combinedOutput.hasOwnProperty(property)) {
        if (combinedOutput[property]) {
          head.push(property);
        }
      }
    }

    this.setState({head});
  };

  moveLeft = (index) => {
    if (index == 0) {
      return;
    }

    let newHead = this.state.head;
    newHead.move(index, index - 1);

    this.setState({head: newHead});
  };

  moveRight = (index) => {
    let newHead = this.state.head;

    if (index == newHead.length - 1) {
      return;
    }

    newHead.move(index, index + 1);

    this.setState({head: newHead});
  };

  timer = () => {
    let modal = Object.assign({}, this.state.modal);
    let second = modal.msg.substring(0, modal.msg.indexOf('秒'));
    modal.msg = `${(parseFloat(second) + 0.01).toFixed(2)}秒`;

    this.setState({modal});
  };

  search = () => {
    if (this.state.conditions.length == 0) {
      this.setState({modal: {show: true, title: '查询条件设置有误', msg: '查询条件不能为空，请设置查询条件。'}});
      return;
    }

    if (this.state.head.length == 0) {
      this.setState({modal: {show: true, title: '输出项设置有误', msg: '输出项不能为空，请选择输出项。'}})
      return;
    }

    let intervalId = setInterval(this.timer, 10);
    this.setState({intervalId: intervalId, modal: {show: true, title: '数据加载中...', msg: '0.00秒'}});

    axios.request({
      method: 'post',
      url: '/zhcx/',
      data: {
        district: this.props.district,
        conditions: this.state.conditions,
        head: this.state.head
      },
      responseType: 'json'
    }).then((response) => {
      clearInterval(this.state.intervalId);
      this.props.setHead(this.state.head);
      this.props.setResult(response.data);
    }).catch((error) => {
      console.log('zhcx load error: ', error);
      clearInterval(this.state.intervalId);
      this.setState({intervalId: -1, modal: {show: true, title: '加载错误', msg: '加载错误，请检查查询条件或重试'}});
    })
  };

  closeModal = () => {
    clearInterval(this.state.intervalId);
    this.setState({intervalId: -1, modal: this.defaultModal});
  };


  renderHead() {
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
      {
        this.state.head.map((col, index) => {
          return <th key={index} style={style}>{col}&nbsp;&nbsp;
            <OutputOperator index={index} moveLeft={this.moveLeft} moveRight={this.moveRight}/>
          </th>
        })
      }
    </tr>
    </thead>;
  }

  render() {
    return (
      <div className="cxtj" style={{height: '400px', overflow: 'auto'}}>
        <Form inline>
          <FormGroup>
            <ControlLabel>条件查询：</ControlLabel>
            {'  '}
            <ButtonGroup>
              <Button bsStyle="primary" onClick={() => this.setState({showAddModal: true})}>新增条件</Button>
              <Button bsStyle="primary" onClick={this.combineConditions}>条件符合</Button>
              <Button bsStyle="primary" onClick={this.separateCondition}>撤销复合</Button>
              <Button bsStyle="primary" onClick={() => this.setState({showOutputFilterModal: true})}>选择输出项</Button>
            </ButtonGroup>
            {' '}
            <Button bsStyle="danger" onClick={() => this.setState({conditions: []})}>清空条件</Button>
            {' '}
            <Button bsStyle="success" onClick={this.search}>开始查询</Button>
          </FormGroup>
          <Add show={this.state.showAddModal} close={this.closeAdd} add={this.addCondition}/>
          <OutputFilter show={this.state.showOutputFilterModal} close={this.closeOutputFilter}
                        setOutput={this.setOutput}/>
        </Form>
        {'  '}
        <Well style={{marginTop: '30px'}}>
          <Tree data={this.state.conditions}
                up={this.upCondition}
                down={this.downCondition}
                check={this.checkCondition}
                remove={this.removeCondition}/>
        </Well>

        <Form>
          <FormGroup>
            <ControlLabel>输出结果：</ControlLabel>
            <Table bordered responsive>
              {this.renderHead()}
            </Table>
          </FormGroup>
        </Form>

        <Modal bsSize="small" keyboard={false} show={this.state.modal.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-danger text-center">{this.state.modal.msg}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.closeModal}>关闭</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Cxtj.propTypes = {
  district: React.PropTypes.string.isRequired,
  setResult: React.PropTypes.func.isRequired,
  setHead: React.PropTypes.func.isRequired
};

export default Cxtj;

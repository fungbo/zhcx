import React from 'react';
import {Form, FormGroup, ControlLabel, ButtonGroup, Button, Well, Table} from 'react-bootstrap';
import Add from './add';
import OutputFilter from './output-filter';
import Tree from './tree';
import update from 'react-addons-update';
import OutputOperator from './output-operator';

export default class Cxtj extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      head: [],
      conditions: [],
      checkedList: []
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

    if (index == newHead.length -1 ) {
      return;
    }

    newHead.move(index, index + 1);

    this.setState({head: newHead});
  };

  search = () => {
    console.log('conditions', this.state.conditions);
  };

  renderHead() {
    return <thead>
    <tr>
      {
        this.state.head.map((col, index) => {
          return <td key={index} style={{whiteSpace: 'nowrap', backgroundColor: '#f5f5f5'}}>{col}&nbsp;&nbsp;
            <OutputOperator index={index} moveLeft={this.moveLeft} moveRight={this.moveRight}/>
          </td>
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
          <FormGroup style={{overflow: 'auto'}}>
            <ControlLabel>查询结果：</ControlLabel>
            <Table bordered responsive>
              {this.renderHead()}
            </Table>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

Cxtj.propTypes = {
  setOutput: React.PropTypes.func.isRequired
};

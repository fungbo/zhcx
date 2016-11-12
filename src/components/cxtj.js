import React from 'react';
import {Form, FormGroup, ControlLabel, ButtonGroup, Button, Well} from 'react-bootstrap';
import Add from './add';
import OutputFilter from './output-filter';
import Tree from './tree';
import update from 'react-addons-update';


export default class Cxtj extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.setOutput(output);
  };

  search = () => {
    console.log('conditions', this.state.conditions);
  };

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
      </div>
    )
  }
}

Cxtj.propTypes = {
  setOutput: React.PropTypes.func.isRequired
};

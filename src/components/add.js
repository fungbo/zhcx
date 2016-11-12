import React from 'react';
import {Modal, FormGroup, Button, ControlLabel, FormControl, option, Grid, Row, Col} from 'react-bootstrap';
import {data, Type} from '../stores/tj-data';

export default class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCondition: -1,
      activeAttribute: -1,
      activeType: -1,
      currentValue: ''
    }
  }

  add = () => {
    this.close();

    let condition = data[this.state.activeCondition];
    let attributes = data[this.state.activeCondition].attributes;
    let attribute = attributes[this.state.activeAttribute];
    let type = Type[attribute.type][this.state.activeType];

    if (this.props.add) {
      this.props.add(`${condition.name} | ${attribute.name} | ${type.name} | ${this.state.currentValue}`);
    }
  };

  close = () => {
    if (this.props.close) {
      this.props.close();
    }
  };

  selectTable = (ev) => {
    let selections = ev.target;
    for (let selection of selections) {
      if (selection.selected) {
        this.setState({activeCondition: selection.index});
        return;
      }
    }
  };

  selectAttribute = (ev) => {
    let selections = ev.target;
    for (let selection of selections) {
      if (selection.selected) {
        this.setState({activeAttribute: selection.index});
        return;
      }
    }
  };

  selectType = (ev) => {
    let selections = ev.target;
    for (let selection of selections) {
      if (selection.selected) {
        this.setState({activeType: selection.index});
        return;
      }
    }
  };

  inputValue = (ev) => {
    this.setState({currentValue: ev.target.value});
  };

  renderAttributes = () => {
    if (this.state.activeCondition == -1) {
      return '';
    }

    return data[this.state.activeCondition].attributes.map(
      (attribute, index) => {
        return <option key={index} value="select">{attribute.name}</option>
      });
  };

  renderType = () => {
    if (this.state.activeCondition == -1 || this.state.activeAttribute == -1) {
      return '';
    }

    let attributes = data[this.state.activeCondition].attributes;
    let attribute = attributes[this.state.activeAttribute];
    return Type[attribute.type].map(
      (type, index) => {
        return <option key={index} value="select">{type.name}</option>
      }
    )
  };

  render() {
    let style = {
      height: '230px'
    };

    return (
      <Modal id="add" bsSize="lg" show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>增加条件</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid>
            <Row>
              <Col xs={2}>
                <FormGroup controlId="logic">
                  <ControlLabel>业务逻辑</ControlLabel>
                  <FormControl style={style} componentClass="select" multiple onChange={this.selectTable}>
                    {data.map((condition, index) => {
                      return <option key={index} value="select">{condition.name}</option>
                    })}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={2}>
                <FormGroup controlId="attributes">
                  <ControlLabel>业务属性</ControlLabel>
                  <FormControl style={style} componentClass="select" multiple onChange={this.selectAttribute}>
                    {this.renderAttributes()}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={2}>
                <FormGroup controlId="types">
                  <ControlLabel>条件类型</ControlLabel>
                  <FormControl style={style} componentClass="select" multiple onChange={this.selectType}>
                    {this.renderType()}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={2}>
                <FormGroup controlId="types">
                  <ControlLabel>值</ControlLabel>
                  <FormControl componentClass="input" onChange={this.inputValue}>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.add}>确定</Button>
        </Modal.Footer>
      </Modal>

    )
  }
}

Add.defaultProps = {
  show: false
};

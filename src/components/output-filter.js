import React from 'react';
import {Modal, Button, Table, Checkbox, ButtonToolbar} from 'react-bootstrap';
import {data} from '../stores/tj-data';
import css from '../styles/output-filter.css';

export default class OutputFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ry: {},
      sy: {},
      by: {}
    }
  }

  setOutput = () => {
    this.close();

    if (this.props.setOutput) {
      this.props.setOutput(this.state);
    }
  };

  close = () => {
    if (this.props.close) {
      this.props.close();
    }
  };

  handleCheckbox = (ev) => {
    let value = ev.target.value;
    let checked = ev.target.checked;

    let ry = Object.assign({}, this.state.ry);
    let sy = Object.assign({}, this.state.sy);
    let by = Object.assign({}, this.state.by);

    if (value.startsWith('人员基本信息')) {
      ry[value] = checked;
    } else if (value.startsWith('生养信息')) {
      sy[value] = checked;
    } else {
      by[value] = checked;
    }

    this.setState({ry, sy, by});
  };

  getCheckedState = (name) => {
    if (name) {
      if (name.startsWith('人员基本信息')) {
        return !!this.state.ry[name];
      } else if (name.startsWith('生养信息')) {
        return !!this.state.sy[name];
      } else {
        return !!this.state.by[name];
      }
    }
    return false;
  };

  selectAllRY = () => {
    let attrs = data[0].attributes;

    let ry = {};
    for (let attr of attrs) {
      ry[`人员基本信息-${attr.name}`] = true;
    }

    this.setState({ry});
  };

  unselectAllRY = () => {
    this.setState({ry: {}});
  };

  selectAllSY = () => {
    let attrs = data[1].attributes;

    let sy = {};
    for (let attr of attrs) {
      sy[`生养信息-${attr.name}`] = true;
    }

    this.setState({sy});
  };

  unselectAllSY = () => {
    this.setState({sy: {}});
  };

  selectAllBY = () => {
    let attrs = data[2].attributes;

    let by = {};
    for (let attr of attrs) {
      by[`避孕状况-${attr.name}`] = true;
    }

    this.setState({by});
  };

  unselectAllBY = () => {
    this.setState({by: {}});
  };

  render() {
    let attrs1 = data[0].attributes;
    let attrs2 = data[1].attributes;
    let attrs3 = data[2].attributes;

    let style = {margin: 0};

    return (
      <Modal id="add" bsSize="lg" show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>选择输出项</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height: '600px', overflow: 'auto'}}>
          <Table bordered condensed>
            <caption>人员基本信息</caption>
            <tbody>
            {
              attrs1.map((attr, index) => {
                if (index % 6 == 0) {
                  let col1 = `人员基本信息-${attrs1[index].name}`;
                  let col2 = attrs1[index + 1] ? `人员基本信息-${attrs1[index + 1].name}` : '';
                  let col3 = attrs1[index + 2] ? `人员基本信息-${attrs1[index + 2].name}` : '';
                  let col4 = attrs1[index + 3] ? `人员基本信息-${attrs1[index + 3].name}` : '';
                  let col5 = attrs1[index + 4] ? `人员基本信息-${attrs1[index + 4].name}` : '';
                  let col6 = attrs1[index + 5] ? `人员基本信息-${attrs1[index + 5].name}` : '';
                  return <tr style={style}>
                    <td className={`${attrs1[index] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col1)}
                                onChange={this.handleCheckbox}
                                value={col1}
                                readOnly>{attrs1[index].name}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 1] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col2)}
                                onChange={this.handleCheckbox}
                                value={col2}
                                readOnly>{attrs1[index + 1] ? attrs1[index + 1].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 2] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col3)}
                                onChange={this.handleCheckbox}
                                value={col3}
                                readOnly>{attrs1[index + 2] ? attrs1[index + 2].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 3] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col4)}
                                onChange={this.handleCheckbox}
                                value={col4}
                                readOnly>{attrs1[index + 3] ? attrs1[index + 3].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 4] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col5)}
                                onChange={this.handleCheckbox}
                                value={col5}
                                readOnly>{attrs1[index + 4] ? attrs1[index + 4].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 5] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col6)}
                                onChange={this.handleCheckbox}
                                value={col6}
                                readOnly>{attrs1[index + 5] ? attrs1[index + 5].name : ''}</Checkbox>
                    </td>
                  </tr>
                } else {
                  return null;
                }
              })
            }
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.selectAllRY}>全部选择</Button>
            <Button bsStyle="primary" onClick={this.unselectAllRY}>全部取消</Button>
          </ButtonToolbar>
          <Table bordered condensed>
            <caption>生养信息</caption>
            <tbody>
            {
              attrs2.map((attr, index) => {
                if (index % 6 == 0) {
                  let col1 = `生养信息-${attrs2[index].name}`;
                  let col2 = attrs2[index + 1] ? `生养信息-${attrs2[index + 1].name}` : '';
                  let col3 = attrs2[index + 2] ? `生养信息-${attrs2[index + 2].name}` : '';
                  let col4 = attrs2[index + 3] ? `生养信息-${attrs2[index + 3].name}` : '';
                  let col5 = attrs2[index + 4] ? `生养信息-${attrs2[index + 4].name}` : '';
                  let col6 = attrs2[index + 5] ? `生养信息-${attrs2[index + 5].name}` : '';
                  return <tr style={style}>
                    <td className={`${attrs2[index] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col1)}
                                onChange={this.handleCheckbox}
                                value={col1}
                                readOnly>{attrs2[index].name}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 1] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col2)}
                                onChange={this.handleCheckbox}
                                value={col2}
                                readOnly>{attrs2[index + 1] ? attrs2[index + 1].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 2] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col3)}
                                onChange={this.handleCheckbox}
                                value={col3}
                                readOnly>{attrs2[index + 2] ? attrs2[index + 2].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 3] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col4)}
                                onChange={this.handleCheckbox}
                                value={col4}
                                readOnly>{attrs2[index + 3] ? attrs2[index + 3].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 4] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col5)}
                                onChange={this.handleCheckbox}
                                value={col5}
                                readOnly>{attrs2[index + 4] ? attrs2[index + 4].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 5] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col6)}
                                onChange={this.handleCheckbox}
                                value={col6}
                                readOnly>{attrs2[index + 5] ? attrs2[index + 5].name : ''}</Checkbox>
                    </td>
                  </tr>
                } else {
                  return null;
                }
              })
            }
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.selectAllSY}>全部选择</Button>
            <Button bsStyle="primary" onClick={this.unselectAllSY}>全部取消</Button>
          </ButtonToolbar>
          <Table bordered condensed>
            <caption>避孕状况</caption>
            <tbody>
            {
              attrs3.map((attr, index) => {
                if (index % 6 == 0) {
                  let col1 = `避孕状况-${attrs3[index].name}`;
                  let col2 = attrs3[index + 1] ? `避孕状况-${attrs3[index + 1].name}` : '';
                  let col3 = attrs3[index + 2] ? `避孕状况-${attrs3[index + 2].name}` : '';
                  let col4 = attrs3[index + 3] ? `避孕状况-${attrs3[index + 3].name}` : '';
                  let col5 = attrs3[index + 4] ? `避孕状况-${attrs3[index + 4].name}` : '';
                  let col6 = attrs3[index + 5] ? `避孕状况-${attrs3[index + 5].name}` : '';
                  return <tr style={style}>
                    <td className={`${attrs3[index] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col1)}
                                onChange={this.handleCheckbox}
                                value={col1}
                                readOnly>{attrs3[index].name}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 1] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col2)}
                                onChange={this.handleCheckbox}
                                value={col2}
                                readOnly>{attrs3[index + 1] ? attrs3[index + 1].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 2] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col3)}
                                onChange={this.handleCheckbox}
                                value={col3}
                                readOnly>{attrs3[index + 2] ? attrs3[index + 2].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 3] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col4)}
                                onChange={this.handleCheckbox}
                                value={col4}
                                readOnly>{attrs3[index + 3] ? attrs3[index + 3].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 4] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col5)}
                                onChange={this.handleCheckbox}
                                value={col5}
                                readOnly>{attrs3[index + 4] ? attrs3[index + 4].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 5] ? '' : css.hidden}`}>
                      <Checkbox style={style} checked={this.getCheckedState(col6)}
                                onChange={this.handleCheckbox}
                                value={col6}
                                readOnly>{attrs3[index + 5] ? attrs3[index + 5].name : ''}</Checkbox>
                    </td>
                  </tr>
                } else {
                  return null;
                }
              })
            }
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.selectAllBY}>全部选择</Button>
            <Button bsStyle="primary" onClick={this.unselectAllBY}>全部取消</Button>
          </ButtonToolbar>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.setOutput}>确定</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

import React from "react";
import {Modal, Button, Table, Checkbox} from "react-bootstrap";
import {data} from "../stores/tj-data";
import css from "../styles/output-filter.css";

export default class OutputFilter extends React.Component {
  setOutput = () => {
    this.close();

    if (this.props.setOutput) {
      this.props.setOutput();
    }
  };

  close = () => {
    if (this.props.close) {
      this.props.close();
    }
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
        <Modal.Body style={{height: "600px", overflow: "auto"}}>
          <Table bordered condensed>
            <caption>人员基本信息</caption>
            <tbody>
            {
              attrs1.map((attr, index) => {
                if (index % 6 == 0) {
                  return <tr style={style}>
                    <td className={`${attrs1[index] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs1[index].name}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 1] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs1[index + 1] ? attrs1[index + 1].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 2] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs1[index + 2] ? attrs1[index + 2].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 3] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs1[index + 3] ? attrs1[index + 3].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 4] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs1[index + 4] ? attrs1[index + 4].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs1[index + 5] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs1[index + 5] ? attrs1[index + 5].name : ''}</Checkbox>
                    </td>
                  </tr>
                } else {
                  return null;
                }
              })
            }
            </tbody>
          </Table>
          <Table bordered condensed>
            <caption>生养信息</caption>
            <tbody>
            {
              attrs2.map((attr, index) => {
                if (index % 6 == 0) {
                  return <tr style={style}>
                    <td className={`${attrs2[index] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs2[index].name}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 1] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs2[index + 1] ? attrs2[index + 1].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 2] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs2[index + 2] ? attrs2[index + 2].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 3] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs2[index + 3] ? attrs2[index + 3].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 4] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs2[index + 4] ? attrs2[index + 4].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs2[index + 5] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs2[index + 5] ? attrs2[index + 5].name : ''}</Checkbox>
                    </td>
                  </tr>
                } else {
                  return null;
                }
              })
            }
            </tbody>
          </Table>
          <Table bordered condensed>
            <caption>避孕状况</caption>
            <tbody>
            {
              attrs3.map((attr, index) => {
                if (index % 6 == 0) {
                  return <tr style={style}>
                    <td className={`${attrs3[index] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs3[index].name}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 1] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs3[index + 1] ? attrs3[index + 1].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 2] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs3[index + 2] ? attrs3[index + 2].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 3] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs3[index + 3] ? attrs3[index + 3].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 4] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs3[index + 4] ? attrs3[index + 4].name : ''}</Checkbox>
                    </td>
                    <td className={`${attrs3[index + 5] ? '' : css.hidden}`}>
                      <Checkbox style={style} readOnly>{attrs3[index + 5] ? attrs3[index + 5].name : ''}</Checkbox>
                    </td>
                  </tr>
                } else {
                  return null;
                }
              })
            }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.setOutput}>确定</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

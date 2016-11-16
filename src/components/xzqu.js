import React from 'react';
import {Form, FormGroup, FormControl, ControlLabel, InputGroup, Button, Modal} from 'react-bootstrap';
import {Treebeard} from 'react-treebeard';
import Style from 'react-treebeard/lib/themes/default';
import {data} from '../stores/xzqu-data';

export default class Xzqu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: {name: data.name, code: data.code},
      selectedDistrict: {name: data.name, code: data.code}
    };
  }

  onToggle = (node, toggled) => {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  };

  selectDistrict = () => {
    this.setState({showModal: false});
    this.setState({selectedDistrict: this.state.cursor});

    console.log('cursor', this.state.cursor);

    this.props.setDistrict(this.state.cursor.code);
  };

  render() {
    let styles = Style;
    styles.tree.base.backgroundColor = 'transparent';
    styles.tree.node.activeLink.background = '#528bb8';
    styles.tree.node.header.base.color = 'black';

    let title = '行政区域选择';

    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>{`${title}：`}</ControlLabel>
          {'  '}
          <InputGroup>
            <FormControl type="text" value={this.state.selectedDistrict.name}/>
            <InputGroup.Button>
              <Button bsStyle="primary" onClick={() => this.setState({showModal: true})}>选择</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Modal bsSize="sm" show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Treebeard data={data} onToggle={this.onToggle}/>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.selectDistrict}>确定</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    )
  }
}

Xzqu.propTypes = {
  setDistrict: React.PropTypes.func.isRequired
};

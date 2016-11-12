import React from 'react';
import {Form, FormGroup, ControlLabel} from 'react-bootstrap';

export default class Cxjg extends React.Component {
  render() {
    return (
      <div className="cxjg" style={{height: '400px', overflow: 'auto'}}>
        <Form inline>
          <FormGroup>
            <ControlLabel>查询结果：</ControlLabel>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

Cxjg.propTypes = {
  output: React.propTypes.object.isRequired
};

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Xzqu from './xzqu';
import Cxtj from './cxtj';
import Cxjg from './cxjg';
import css from '../styles/zhcx.css';
import {data} from '../stores/xzqu-data';

export default class Zhcx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      district: data.name,
      head: [],
      result: []
    }
  };

  setDistrict = (district) => {
    this.setState({district});
  };

  setHead = (head) => {
    this.setState({head});
  };

  setResult = (result) => {
    this.setState({result});
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8} className={`${css.column} ${css.xzqu}`}>
            <Xzqu setDistrict={this.setDistrict}/>
          </Col>
        </Row>

        <Row>
          <Col xs={8} className={`${css.column} ${css.cxtj}`}>
            <Cxtj district={this.state.district}
                  setHead={this.setHead}
                  setResult={this.setResult}/>
          </Col>
        </Row>

        <Row>
          <Col xs={8} className={`${css.column} ${css.cxjg}`}>
            <Cxjg head={this.state.head} result={this.state.result}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Zhcx.defaultProps = {};

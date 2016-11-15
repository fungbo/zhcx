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
      data: {count: 10, result: []}
    }
  };

  setDistrict = (district) => {
    this.setState({district});
  };

  setHead = (head) => {
    this.setState({head});
  };

  setResult = (data) => {
    this.setState({data});
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={9} className={`${css.column} ${css.xzqu}`}>
            <Xzqu setDistrict={this.setDistrict}/>
          </Col>
        </Row>

        <Row>
          <Col xs={9} className={`${css.column} ${css.cxtj}`}>
            <Cxtj district={this.state.district}
                  setHead={this.setHead}
                  setResult={this.setResult}/>
          </Col>
        </Row>

        <Row>
          <Col xs={9} className={`${css.jgColumn} ${css.cxjg}`}>
            <Cxjg head={this.state.head} data={this.state.data}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Zhcx.defaultProps = {};

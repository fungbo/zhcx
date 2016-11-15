import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Xzqu from './xzqu';
import Cxtj from './cxtj';
import Cxjg from './cxjg';
import css from '../styles/zhcx.css';
import {data} from '../stores/xzqu-data';
import axios from 'axios';

export default class Zhcx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      district: data.name,
      activePage: 1,
      activeMaxNum: 30,
      head: [],
      data: {},
      result: {count: 0, data: []}
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

  setData = (data) => {
    this.setState(data);
  };

  setActivePage = (value) => {
    this.setState({activePage: value});
  };

  setActiveMaxNum = (value) => {
    this.setState({activeMaxNum: value});
  };

  sendRequest = () => {
    console.log('sendRequest');
    if (Object.keys(this.state.data).length === 0) {
      return;
    }

    axios.request({
      method: 'post',
      url: '/zhcx/',
      data: this.state.data,
      responseType: 'json'
    }).then((response) => {
      this.setHead(this.state.head);
      this.setResult(response.data);
    }).catch((error) => {
      console.log('zhcx load error: ', error);
    })
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
            <Cxtj activePage={this.state.activePage}
                  activeMaxNum={this.state.activeMaxNum}
                  district={this.state.district}
                  setHead={this.setHead}
                  setData={this.setData}
                  setResult={this.setResult}/>
          </Col>
        </Row>

        <Row>
          <Col xs={9} className={`${css.jgColumn} ${css.cxjg}`}>
            <Cxjg head={this.state.head}
                  activePage={this.state.activePage}
                  activeMaxNum={this.state.activeMaxNum}
                  setActivePage={this.setActivePage}
                  setActiveMaxNum={this.setActiveMaxNum}
                  result={this.state.result}
                  sendRequest={this.sendRequest}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Zhcx.defaultProps = {};

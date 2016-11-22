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
      district: data.code,
      activePage: 1,
      activeMaxNum: 30,
      head: [],
      sortHead: {},
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
    this.setState({data});
  };

  setActivePage = (value) => {
    this.setState({activePage: value});
  };

  setActiveMaxNum = (value) => {
    this.setState({activeMaxNum: value});
  };

  setSortHead = (sortHead) => {
    this.setState({sortHead});

    this.sendRequest(sortHead);
  };

  convertSortHead = (sortHead) => {
    let keys = Object.keys(sortHead);

    let res = [];
    for (let key of keys) {
      res.push({name: key, sort: sortHead[key]})
    }

    return res;
  };

  exportExcel = (sortHead = this.state.sortHead, url) => {
    if (Object.keys(this.state.data).length === 0) {
      return;
    }

    let data = Object.assign({}, this.state.data);
    data.sortHead = this.convertSortHead(sortHead);


    axios.request({
      method: 'post',
      url: '/zhcx-excel',
      data: data,
    }).then((response) => {
      window.location = `/zhcx-excel/${response.data}`
    }).catch(error => console.log('zhcx export error: ' + error));
  };

  sendRequest = (sortHead = this.state.sortHead) => {
    if (Object.keys(this.state.data).length === 0) {
      return;
    }

    let data = Object.assign({}, this.state.data);
    data.pageNumber = this.state.activePage;
    data.maxRecordsPerPage = this.state.activeMaxNum;
    data.sortHead = this.convertSortHead(sortHead);

    axios.request({
      method: 'post',
      url: '/zhcx/',
      data: data,
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
                  sortHead={this.state.sortHead}
                  activePage={this.state.activePage}
                  activeMaxNum={this.state.activeMaxNum}
                  setActivePage={this.setActivePage}
                  setActiveMaxNum={this.setActiveMaxNum}
                  setSortHead={this.setSortHead}
                  result={this.state.result}
                  sendRequest={this.sendRequest}
                  exportExcel={this.exportExcel}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Zhcx.defaultProps = {};

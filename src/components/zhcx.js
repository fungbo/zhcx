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
      district: data.name
    };
  }

  setDistrict = (district) => {
    this.setState({district});
  };

  render() {
    return (
      <Grid>
        <Row><Col xs={8} className={`${css.column} ${css.xzqu}`}><Xzqu setDistrict={this.setDistrict}/></Col></Row>
        <Row><Col xs={8} className={`${css.column} ${css.cxtj}`}><Cxtj district={this.state.district}/></Col></Row>
        <Row><Col xs={8} className={`${css.column} ${css.cxjg}`}><Cxjg/></Col></Row>
      </Grid>
    )
  }
}

Zhcx.defaultProps = {};

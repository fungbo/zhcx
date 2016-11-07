import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Xzqu from "./xzqu";
import Cxtj from "./cxtj";
import Cxjg from "./cxjg";
import css from "../styles/zhcx.css";

export default class Zhcx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'hello world'
    };
  }

  render() {
    return (
      <Grid>
        <Row><Col xs={8} className={`${css.column} ${css.xzqu}`}><Xzqu/></Col></Row>
        <Row><Col xs={8} className={`${css.column} ${css.cxtj}`}><Cxtj/></Col></Row>
        <Row><Col xs={8} className={`${css.column} ${css.cxjg}`}><Cxjg/></Col></Row>
      </Grid>
    )
  }
}

Zhcx.defaultProps = {};

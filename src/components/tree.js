import React from 'react';
import css from '../styles/tree.css';
import Operator from './condition-operator';

export default class Tree extends React.Component {
  remove = (index) => {
    if (this.props.remove) {
      this.props.remove(index);
    }
  };

  check = (index, checked) => {
    if (this.props.check) {
      this.props.check(index, checked);
    }
  };

  up = (index) => {
    if (this.props.up) {
      this.props.up(index);
    }
  };

  down = (index) => {
    if (this.props.down) {
      this.props.down(index);
    }
  };

  render() {
    return (
      <div id={css.wrapper}>
        {this.props.data.map((entry, index) => {
          if (entry.name == '复合条件') {
            return <div key={index} className={css.entry}><span className={css.label}>{entry.name}</span>
              <div className={css.branch}>
                {entry.children.map((children, index) => {
                  return <div key={index} className={css.entry}>
                    <span className={css.label}>{children.name}</span>
                  </div>
                })}
              </div>
            </div>
          } else {
            return <div key={index} className={css.entry}>
              <span className={css.label}>{entry.name}&nbsp;&nbsp;
                <Operator index={index} label={entry.name} up={this.up} down={this.down} check={this.check}
                          remove={this.remove}/>
              </span>
            </div>
          }
        })}
      </div>
    )
  }
}

Tree.defaultProps = {
  data: []
};

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import ZHCX from './components/zhcx';

Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    var k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  return this; // for testing purposes
};

// Render the main component into the dom
ReactDOM.render(<ZHCX />, document.getElementById('zhcx'));

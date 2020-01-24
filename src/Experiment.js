import React, { Component } from 'react';

import htmlKeyboardResponse from './jspsych-6.1.0/plugins/jspsych-html-keyboard-response';
import jsPsych from './jspsych-6.1.0/jspsych';

class Experiment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const trial = {
      type: htmlKeyboardResponse,
      stimulus: 'Hello world!',
    };

    jsPsych.init({
      timeline: [trial],
    });

    return (<div />);
  }
}

export default Experiment;

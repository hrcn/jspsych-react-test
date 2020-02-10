import React, { Component } from 'react';

import {
  welcome, instructions, test_procedure, debrief_block,
} from '../timelines/Timeline';

import jsPsych from '../../jspsych-6.1.0/jspsych';
import '../../jspsych-6.1.0/plugins/jspsych-html-keyboard-response';
import '../../jspsych-6.1.0/plugins/jspsych-image-keyboard-response';

import '../../jspsych-6.1.0/jspsych.css';

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: [welcome, instructions, test_procedure, debrief_block],
    };
  }

  render() {
    const { timeline } = this.state;
    return (
      <div>
        {
          jsPsych.init({
            timeline,
            on_finish() { jsPsych.data.displayData(); },
          })
        }
      </div>
    );
  }
}

export default Experiment;

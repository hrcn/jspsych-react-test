import React from 'react';

import jsPsych from '../../jspsych-6.1.0/jspsych';
import Timeline from '../timelines/Timeline';

import '../../jspsych-6.1.0/jspsych.css';

import '../../jspsych-6.1.0/plugins/jspsych-html-keyboard-response';

const Lex = () => <div>{jsPsych.init({ timeline: Timeline })}</div>;

export default Lex;
import React from 'react';

import jsPsych from './jspsych-6.1.0/jspsych';
import './jspsych-6.1.0/plugins/jspsych-html-keyboard-response';

const experiment = (props) => {
    return (
        <div>
            {jsPsych.init({timeline: [props.trial]})}
        </div>
    );
};

export default experiment;
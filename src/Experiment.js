import React from 'react';
import jsPsych from './jspsych-6.1.0/jspsych';

const experiment = (props) => {
    return (
        jsPsych.init({timeline: [props.trial]})
    );
};

export default experiment;
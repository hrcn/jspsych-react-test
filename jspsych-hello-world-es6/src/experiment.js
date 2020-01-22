import jsPsych from '../jspsych-6.1.0/jspsych';
import htmlKeyboardResponse from '../jspsych-6.1.0/plugins/jspsych-html-keyboard-response';

const hello_trial = {
  type: 'html-keyboard-response',
  stimulus: 'Hello world!',
};

jsPsych.init({
  timeline: [hello_trial],
});

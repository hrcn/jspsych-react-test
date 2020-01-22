import jsPsych from '../jspsych-6.1.0/jspsych';
import htmlKeyboardResponse from '../jspsych-6.1.0/plugins/jspsych-html-keyboard-response';
import imageKeyboardResponse from '../jspsych-6.1.0/plugins/jspsych-image-keyboard-response';

/* create timeline */
const timeline = [];

/* define welcome message trial */
const welcome = {
  type: 'html-keyboard-response',
  stimulus: 'Welcome to the experiment. Press any key to begin.',
};
timeline.push(welcome);

/* define instructions trial */
const instructions = {
  type: 'html-keyboard-response',
  stimulus: '<p>In this experiment, a circle will appear in the center '
          + 'of the screen.</p><p>If the circle is <strong>blue</strong>, '
          + 'press the letter F on the keyboard as fast as you can.</p>'
          + '<p>If the circle is <strong>orange</strong>, press the letter J '
          + 'as fast as you can.</p>'
          + "<div style='width: 700px;'>"
          + "<div style='float: left;'><img src='img/blue.png'></img>"
          + "<p class='small'><strong>Press the F key</strong></p></div>"
          + "<div class='float: right;'><img src='img/orange.png'></img>"
          + "<p class='small'><strong>Press the J key</strong></p></div>"
          + '</div>'
          + '<p>Press any key to begin.</p>',
  post_trial_gap: 2000,
};
timeline.push(instructions);

/* test trials */
const test_stimuli = [
  { stimulus: "img/blue.png", data: { test_part: 'test', correct_response: 'f' } },
  { stimulus: "img/orange.png", data: { test_part: 'test', correct_response: 'j' } },
];

const fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration() {
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  },
  data: { test_part: 'fixation' },
};

const test = {
  type: 'image-keyboard-response',
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: jsPsych.timelineVariable('data'),
  on_finish(data) {
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
  },
};

const test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  repetitions: 5,
  randomize_order: true,
};
timeline.push(test_procedure);

/* define debrief */

const debrief_block = {
  type: 'html-keyboard-response',
  stimulus() {
    const trials = jsPsych.data.get().filter({ test_part: 'test' });
    const correct_trials = trials.filter({ correct: true });
    const accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    const rt = Math.round(correct_trials.select('rt').mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>`
        + `<p>Your average response time was ${rt}ms.</p>`
        + '<p>Press any key to complete the experiment. Thank you!</p>';
  },
};
timeline.push(debrief_block);

/* start the experiment */
jsPsych.init({
  timeline,
  on_finish() {
    jsPsych.data.displayData();
  },
});

/* eslint-disable camelcase */
import jsPsych from '../../jspsych-6.1.0/jspsych';

const timeline = [];

const welcome = {
  type: 'html-keyboard-response',
  stimulus: '<p>Welcome to the experiment. Please press C to continue.</p>',
  choices: ['c'],
};

timeline.push(welcome);

const instructions = {
  type: 'html-keyboard-response',
  stimulus: '<p>You will see two sets of letters displayed in a box, like this:</p>'
      + '<div class="fixation"><p class="top">HELLO</p><p class="bottom">WORLD</p></div>'
      + '<p>Press Y if both sets are valid English words. Press N if one or both is not a word.</p>'
      + '<p>Press Y to continue.</p>',
  choices: ['y'],
};

timeline.push(instructions);

const instructions_2 = {
  type: 'html-keyboard-response',
  stimulus: '<p>In this case you would press N</p>'
      + '<div class="fixation"><p class="top">FOOB</p><p class="bottom">ARTIST</p></div>'
      + '<p>Press N to continue to the start of the experiment.</p>',
  choices: ['n'],
};

timeline.push(instructions_2);

const trials = [
  {
    word_1: 'SOCKS', word_2: 'SHOE', both_words: true, related: true,
  },
  {
    word_1: 'SLOW', word_2: 'FAST', both_words: true, related: true,
  },
  {
    word_1: 'QUEEN', word_2: 'KING', both_words: true, related: true,
  },
  {
    word_1: 'LEAF', word_2: 'TREE', both_words: true, related: true,
  },

  {
    word_1: 'SOCKS', word_2: 'TREE', both_words: true, related: false,
  },
  {
    word_1: 'SLOW', word_2: 'SHOE', both_words: true, related: false,
  },
  {
    word_1: 'QUEEN', word_2: 'FAST', both_words: true, related: false,
  },
  {
    word_1: 'LEAF', word_2: 'KING', both_words: true, related: false,
  },

  {
    word_1: 'AGAIN', word_2: 'PLAW', both_words: false, related: false,
  },
  {
    word_1: 'BOARD', word_2: 'TRUDE', both_words: false, related: false,
  },
  {
    word_1: 'LIBE', word_2: 'HAIR', both_words: false, related: false,
  },
  {
    word_1: 'MOCKET', word_2: 'MEET', both_words: false, related: false,
  },

  {
    word_1: 'FLAFF', word_2: 'PLAW', both_words: false, related: false,
  },
  {
    word_1: 'BALT', word_2: 'TRUDE', both_words: false, related: false,
  },
  {
    word_1: 'LIBE', word_2: 'NUNE', both_words: false, related: false,
  },
  {
    word_1: 'MOCKET', word_2: 'FULLOW', both_words: false, related: false,
  },
];

const lexical_decision_procedure = {
  timeline: [
    {
      type: 'html-keyboard-response',
      stimulus: '<div class="fixation"></div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
    },
    {
      type: 'html-keyboard-response',
      stimulus() {
        return `<div class="fixation"><p class="top">${jsPsych.timelineVariable('word_1', true)}</p><p class="bottom">${jsPsych.timelineVariable('word_2', true)}</p></div>`;
      },
      choices: ['y', 'n'],
      data: {
        both_words: jsPsych.timelineVariable('both_words'),
        related: jsPsych.timelineVariable('related'),
      },
      on_finish(data) {
        const char_resp = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        if (data.both_words) {
          data.correct = char_resp == 'y';
        } else {
          data.correct = char_resp == 'n';
        }
      },
    },
    {
      type: 'html-keyboard-response',
      stimulus() {
        const last_correct = jsPsych.data.get().last(1).values()[0].correct;
        if (last_correct) {
          return '<div class="fixation correct"></div>';
        }
        return '<div class="fixation incorrect"></div>';
      },
      choices: jsPsych.NO_KEYS,
      trial_duration: 2000,
    },
  ],
  timeline_variables: trials,
  randomize_order: true,
};

timeline.push(lexical_decision_procedure);

const data_summary = {
  type: 'html-keyboard-response',
  stimulus() {
    const mean_rt_related = jsPsych.data.get().filter({ related: true, both_words: true, correct: true }).select('rt').mean();
    const mean_rt_unrelated = jsPsych.data.get().filter({ related: false, both_words: true, correct: true }).select('rt').mean();
    return `<p>Average response time for related words: ${Math.round(mean_rt_related)}ms</p>`
      + `<p>Average response time for unrelated words: ${Math.round(mean_rt_unrelated)}ms</p>`;
  },
  choices: jsPsych.NO_KEYS,
};

timeline.push(data_summary);

export default timeline;

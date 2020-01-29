import React, { Component } from 'react';

import './jspsych-6.1.0/jspsych';
import './jspsych-6.1.0/plugins/jspsych-html-keyboard-response';
import Experiment from './Experiment';

class App extends Component {
  render() {
    const hello_trial = {
      type: 'html-keyboard-response',
      stimulus: 'Hello world!'
    }

    return (
      <div className="App">
        <Experiment trial={hello_trial}/>
      </div>
    )
  }
}

export default App;

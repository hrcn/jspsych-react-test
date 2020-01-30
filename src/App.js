import React from 'react';

import Experiment from './Experiment';

const App = () => {
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

export default App;

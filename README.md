# Basic Version

### 1. Download latest version of jsPsych
jsPsych releases: https://github.com/jspsych/jsPsych/releases


### 2. Modify jspsych.js
Change `window.jsPsych` to `const jsPsych` at the beginning, add `export default jsPsych` at the end.


### 3. Modify plugins
Add `import jsPsych from ...` to every plugin file.


### 4. Init npm
`npm init -y` -y means default settings.


### 5. Add eslint (Optional)
`npm install -g eslint`

`eslint --init`, store it in `.json` format.


### 6. Install transpilation packages
`npm install --save-dev @babel/core @babel/preset-env babel-loader webpack webpack-cli`


### 7. Create necessary files:
* `experiment.html`
* A src folder including `experiment.js`
* An `asset` folder including images etc.


### 8. Modify experiment.js
Add `import jsPsych from ...` and `import plugins from ...` at the beginning.


### 9. Create webpack.config.js
Use `touch webpack.config.js` to create a webpack config file in your experiment root path.


### 10. Modify webpack.config.js
Boilerplate:
```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/experiment.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
```


### 11. Add build script
In `package.json`, add a build script:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  }
 ```
 
 
 ### 12. Transpile and bundle codes
 Run `npm run build`, you should see a new folder `build` and a file `main.js` in it.
 
 
 ### 13. Add the main.js in experiment.html
 Add `<script src="build/main.js"></script>` under the body tag. Remove original script tags.
 Open `experiment.html`
 
 ### 14. Add git ignore
 `touch .gitignore` ignoring `node_modules/` and `build/`
 
 # React Version
 
### 1. Create boilerplate
Run `npx create-react-app your-app-name-here`

### 2. Download jsPsych
jsPsych releases: https://github.com/jspsych/jsPsych/releases
 
### 3. Modify plugins
Add `import jsPsych from ...` to plugin files you are using

### 4. Modify jsPsych.js
Change `window.jsPsych` to `const jsPsych` at the beginning, add `export default jsPsych` at the end.

?Line 40 - 42: `'webkitAudioContext' is not defined`, change it to `window.AudioContext = window.webkitAudioContext;`

?Line 1656: `'turk_info' is not defined`, comment out temporarily

### 5. Build components & pass props to children
In `Lex.js`:

```
import React from 'react';

import jsPsych from '../../jspsych-6.1.0/jspsych';
import Timeline from '../timelines/Timeline';

import '../../jspsych-6.1.0/jspsych.css';

import '../../jspsych-6.1.0/plugins/jspsych-html-keyboard-response';

const Lex = () => <div>{jsPsych.init({ timeline: Timeline })}</div>;

export default Lex;
```

In `App.js`:

```
import React from 'react';

import Lex from './components/experiment/Lex';

const App = () => <Lex />;

export default App;
```

### 6. Run npm start

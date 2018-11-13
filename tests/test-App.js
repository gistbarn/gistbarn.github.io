import App from '../src/views/App.js';

const state = {
  isLoggedIn: true,
  name: 'testuser'
};

App(state).to('.test', 'replace');


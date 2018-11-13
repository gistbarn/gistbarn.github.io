import {R,X} from '../node_modules/brutalist-web/r.js';
import * as API from './api.js';
import AuthIn from './views/AuthIn.js';
import App from './views/App.js';

let retries = 5;

export const appState = {
  name: 'anon',
  currentFeed: ':feed'
};

Object.assign(self, {appState});

start();

async function start() {
  const isLoggedIn = await API.isLoggedIn(appState);
  if ( !isLoggedIn ) {
    AuthIn(appState).to('main.app', 'innerHTML');
  } else {
    appState.name = appState.profileData.login;
    await API.getFollowers(appState);
    await API.getMyGists(appState);
    await API.getFeed(appState);
    (await App(appState)).to('main.app', 'innerHTML');
  }
}


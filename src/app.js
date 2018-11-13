import {R,X} from '../node_modules/brutalist-web/r.js';
import * as API from './api.js';
import AuthIn from './views/AuthIn.js';
import App from './views/App.js';

let retries = 5;

const appState = {
  name: 'anon',
};

start();

async function start() {
  const code = getCode();
  if ( ! code || code == 'logout' ) {
    const token = localStorage.getItem('token');  
    appState.loggedIn = token;
    if ( ! token ) return AuthIn({}).to('main.app', 'innerHTML');
  } else {
    const {token} = await fetch(`https://gistbarn.herokuapp.com/authenticate/${code}`).then(r => r.json());
    console.log({loggedIn:token});
    if( !!token ) {
      localStorage.setItem('token', token);
    } else {
      return AuthIn({}).to('main.app', 'innerHTML');
    }
    appState.loggedIn = token;
  }
  try {
    await API.getProfile(appState);
  } catch(e) {
    if ( retries-- ) return AuthIn({}).to('main.app', 'innerHTML'); 
    else return console.error("Stopping", e);
    return;
  }
  const newURL = new URL(location.href);
  newURL.search = '';
  history.pushState({}, "Gistbarn | LoggedIn", newURL);
  (await App(appState)).to('main.app', 'innerHTML');
}

function getCode() {
  try {
    const code = window.location.search.match(/\?code=(.*)/)[1];
    console.log({tempCode:code});
    return code;
  } catch(e) { return null; }
}

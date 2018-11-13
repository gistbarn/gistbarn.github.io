import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function AuthIn(state) {
  return R`
    ${state.loggedIn ? R`
      <span class=username>${state.name}</span>
      <span class=logout><a click=${logout} href=#logout>Logout</a></span>` :
    R`
      <span class="authin">
        <a href=https://github.com/login/oauth/authorize?client_id=d10c47b12243b3cdfd86&scope=gist>Login</a>
      </span>
    `}
  `;
}

function logout() {
  localStorage.setItem('token', '');
  history.popState();
  location.search = '?code=logout';
}

import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function MyAuth(state) {
  return R`
    <span class=username>${state.name}</span>
    <span class=logout><a click=${() => logout(state)} href=#logout>Logout</a></span>
  `;
}

function logout(state) {
  localStorage.setItem('token', '');
  Object.assign(state, {
    token: null,
    profileData: null,
    isLoggedIn: false
  });
  location = '/';
}

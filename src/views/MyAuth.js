import {R,X} from '../../node_modules/brutalist-web/r.js';
import browseUser from '../browseUser.js';

export default function MyAuth(state) {
  return R`
    <span class=myauth>
      <span class=username>
        <a 
          click=${e => browseUser(e, state.name, state)} 
          href=#browse-${state.name}>
            ${state.name}
        </a>
      </span>
      <span class=logout><a click=${() => logout(state)} href=#logout>Logout</a></span>
    </span>
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

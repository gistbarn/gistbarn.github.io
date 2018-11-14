import {R,X} from '../../node_modules/brutalist-web/r.js';
import App from './App.js';
import {followUser} from '../api.js';

export default function Discover(state) {
  return R`
    <div class=discover>
      <h1>Discover others</h1> 
      <ul>
        ${state.discover ? state.discover.map(login => R`${{key:login}}
          <li>
            <a href=#follow-${login} click=${async e => {
              await followUser(login, state);
              App(state);
            }}>${login}</a>
          </li>
        `) : R`<p>Getting your discovery list...</p>` }
      </ul>
    </div>
  `;
}

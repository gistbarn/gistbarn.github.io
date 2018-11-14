import {R,X} from '../../node_modules/brutalist-web/r.js';
import {client_id} from '../../config.js';

export default function AuthIn(state) {
  return R`
    <span class="authin">
      <a href=https://github.com/login/oauth/authorize?client_id=${client_id}&scope=gist>Login</a>
    </span>
  `;
}


import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function AuthIn(state) {
  return R`
    ${state.loggedIn ? R`<span class=username>${state.name}</span>` :
    R`
      <section class="authin">
        <a href=https://github.com/login/oauth/authorize?client_id=d10c47b12243b3cdfd86&scope=gist>Login</a>
      </section>
    `}
  `;
}

import {R,X} from '../../node_modules/brutalist-web/r.js';
import * as API from '../api.js';
import MyAuth from './MyAuth.js';
import PostList from './PostList.js';
import NewPost from './NewPost.js';
import browseUser from '../browseUser.js';

export default function App(state) {
  return R`
    <article class="holygrail debug">
      <header>
        <span class=heading><a href=/>GistBarn</a></span>
        <span class=auth>
          ${MyAuth(state)}
        </span>
      </header>
      <nav>
        <header>Followers</header>
        <ul>
          ${state.followers.map(f => R`${{key:f.node_id}}
            <li>
              <a href=#browse-${f.login} click=${e => browseUser(e, f.login, state)}>${f.login}</a>
            </li>
          `)}
        </ul>
      </nav>
      <article> 
        ${NewPost(state)}
        <section class="post-stream">
          ${PostList(state, {type:'gists'})}
        </section>
      </article>
      <aside>Suggested things?</aside>
      <footer>Footer</footer>
    </article>
  `;
}


import {R,X} from '../../node_modules/brutalist-web/r.js';
import browseUser from '../browseUser.js';

export default function PostList(state, {type, key}) {
  let list;
  if (! key ) {
    list = state[type];
  } else {
    list = state[type].get(key);
  }
  return R`
    <link rel=stylesheet href=src/views/styles/PostList.css>
    <section class="postlist">
      ${ list && list.length ? R`
      <ul>
        ${list.map(post => R`${{key:post.id}}
          <li>
            <section class="postsummary">
              <header>
                <a href=#readPost-${post.id} click=${e => readPost(e, post)}>
                  ${post.description || 'Untitled'}
                </a>
              </header>
              <div class="postcontent">${Object.keys(post.files).join(', ')}</div>
              <a href=#browse-${post.owner.login} click=${e => browseUser(e, post.owner.login, state)}>${post.owner.login}</a>
              <time datetime="${post.updated_at}">${post.time_ago} ago</time>
            </section>
          </li>
        `)}
      </ul>` : key ? X`<span>${key} has no posts.</span>` : X`<span>No posts to show right now.</span>` }
    </section>
  `;
}

function readPost(clickEvent, post) {
  //console.log("Reading", {post});
}

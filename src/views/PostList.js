import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function PostList(state, {type}) {
  return R`
    <section class="postlist">
      ${ state[type] ? R`
      <ul>
        ${state[type].map(post => R`${{key:post.id}}
          <li>
            <section class="postsummary">
              <header>${post.description}</header>
              <div class="postcontent">${Object.keys(post.files).join(', ')}</div>
              <a href=#readPost-${post.id} click=${e => readPost(e, post)}>Read more</a>
            </section>
          </li>
        `)}
      </ul>` : X`<span>No posts to show right now.</span>` }
    </section>
  `;
}

function readPost(clickEvent, post) {
  //console.log("Reading", {post});
}

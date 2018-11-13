import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function PostList(state) {
  return R`
    <section class="postlist">
      ${ state.posts ? R`
      <ul>
        ${state.posts.forEach(post => R`
          <li>
            <section class="postsummary">
              <header>${post.title}</header>
              <div class="postcontent">${post.snippet}</div>
              <a click=${post.readMore || (() => (1))}>Read more</a>
            </section>
          </li>
        `)}
      </ul>` : X`<span>No posts to show right now.</span>` }
    </section>
  `;
}

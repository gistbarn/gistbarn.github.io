import {R,X} from '../../node_modules/brutalist-web/r.js';
import MyAuth from './MyAuth.js';
import Post from './Post.js';

export default function App(state) {
  return R`
    <article class="holygrail debug">
      <header>
        <span class=heading>Gistbarn</span>
        <span class=auth>
          ${MyAuth(state)}
        </span>
      </header>
      <nav>
        <header>Other posts</header>
        <ul>
          <li><a href=#post1>Post 1</a>
          <li><a href=#post2>Post 2</a>
        </ul>
      </nav>
      <article> 
        ${Post(state)}
        <section class="post-stream">
          ${Post(state)}
          ${Post(state)}
          ${Post(state)}
        </section>
      </article>
      <aside>Suggested posts?</aside>
      <footer>Footer</footer>
    </article>
  `;
}

import {R,X} from '../../node_modules/brutalist-web/r.js';
import MyAuth from './MyAuth.js';
import PostList from './PostList.js';
import Post from './Post.js';

export default function App(state) {
  return R`
    <article class="holygrail debug">
      <header>
        <span class=heading>GistBarn</span>
        <span class=auth>
          ${MyAuth(state)}
        </span>
      </header>
      <nav>
        <header>Other things</header>
        <ul>
          <li><a href=#post1>Link 1</a>
          <li><a href=#post2>Link 2</a>
        </ul>
      </nav>
      <article> 
        ${Post(state)}
        <section class="post-stream">
          ${PostList(state, {type:'gists'})}
        </section>
      </article>
      <aside>Suggested things?</aside>
      <footer>Footer</footer>
    </article>
  `;
}

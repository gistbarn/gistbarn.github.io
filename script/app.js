import {R,X} from '../node_modules/brutalist-web/r.js';

App({}).to('main.app', 'innerHTML');

function App(s) {
  return R`
    <article class="holygrail debug">
      <header>Gitstbarn</header>
      <nav>
        <header>Other posts</header>
        <ul>
          <li><a href=#post1>Post 1</a>
          <li><a href=#post2>Post 2</a>
        </ul>
      </nav>
      <article> 
        ${Post(s)}
        <section class="post-stream">
          ${Post(s)}
          ${Post(s)}
          ${Post(s)}
        </section>
      </article>
      <aside>Suggested posts?</aside>
      <footer>Footer</footer>
    </article>
  `;
}

function Post(s) {
  return R`
    <article ${{key:Math.random()}} class="post view">
      <section class="post">
        <header>Post title</header>
        <section class="post paragraphs">
          <p>First para
          <p>Second para
        </section>
        <footer>
          <time>Post date</time>
          <author>Post author</author>
        </footer>
      </section>
      <section class="post edit">
        <p>
          <input name=tags placeholder=tags> 
        <p>
          <textarea name=post class="markdown live-mode"></textarea>
        <p>
          <button class=post>Post</button>
      </section>
    </article>
  `;
}

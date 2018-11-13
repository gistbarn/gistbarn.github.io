import {R,X} from '../node_modules/brutalist-web/r.js';

App({}).to('main.app', 'innerHTML');

function App(state) {
  const s = Object.assign({}, state);
  return R`
    <article class="holygrail debug">
      <header>
        <span class=heading>Gistbarn</span>
        <section class=auth>
          ${state.loggedIn? UserMenu(state) : LogIn(state)}
        </section>
      </header>
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

function Post(state) {
  const s = Object.assign({}, state);
  s.key = Math.random();
  return R`
    <article ${s} class="post view">
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

function UserMenu(state) {
  return R`<span class=usermenu>${state.userMenu.name}</span>`;
}

function LogIn(state) {
  return R`<span class=loginmenu><button class=login>Login</button></span>`;
}
import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function Post(state) {
  return R`
    <article class="post view edit">
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

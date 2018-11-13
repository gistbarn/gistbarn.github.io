import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function NewPost(state) {
  return R`${
    showNewPost(state) ? R`
      <article class="post view edit">
        <section class="post edit">
          <p>
            <input name=tags placeholder=tags> 
          <p>
            <textarea name=post class="markdown live-mode"></textarea>
          <p>
            <button class=post>Post</button>
        </section>
      </article>
      ` : R`<h1>${state.currentFeed}'s posts</h1>`
   }`;
}

function showNewPost(state) {
  if ( ! state.currentFeed || state.currentFeed == ':feed' || state.currentFeed == state.name ) {
    return true;
  } else return false;
}

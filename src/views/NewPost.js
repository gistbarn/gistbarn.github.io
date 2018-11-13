import {R,X} from '../../node_modules/brutalist-web/r.js';
import {newPost} from '../api.js';

export default function NewPost(state) {
  return R`${
    showNewPost(state) ? R`
      <div class=newpost>
        <h1>${state.currentFeed !== state.name ? "My feed" : "My posts" }</h1>
        <article class="post view edit">
          <form submit=${e => (e.preventDefault(), newPost(e, state))} action=#post class="post edit">
            <p>
              <input required name=description placeholder=description> 
            <p>
              <textarea required placeholder="What do you want to say?" name=content></textarea>
            <p>
              <button class=post>Post</button>
          </section>
        </article>
      </div>
      ` : state.currentFeed !== state.name ? R`<h1>${state.currentFeed}'s posts</h1>` : R`<h1>My Posts</h1>`
   }`;
}

function showNewPost(state) {
  if ( ! state.currentFeed || state.currentFeed == ':feed' || state.currentFeed == state.name ) {
    return true;
  } else return false;
}

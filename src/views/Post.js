import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function Post(post) {
  return R`
    <article class=post>
      <h1>${post.description}</h1>
      <ul>
        ${Object.values(post.files).map(file => X`
        <li>
          <header>${file.filename}</header>
          <section class=content>
            <pre>${R.skip((console.log(file.content),file.content))}</pre>
          </section> 
        </li>`)}
      </ul>
    </article>
 `;
}


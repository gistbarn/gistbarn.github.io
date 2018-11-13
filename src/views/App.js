import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function App(state) {
  return R`
    <article class="app holygrail debug">
      <header>
        <span class=heading>Gistbarn</span>
        <span class=auth>
          Auth Section
        </span>
      </header>
      <nav>
        <header>Nav Section</header>
      </nav>
      <article> 
        Main Section
      </article>
      <aside>Aside Section</aside>
      <footer>Footer</footer>
    </article>
  `;
}

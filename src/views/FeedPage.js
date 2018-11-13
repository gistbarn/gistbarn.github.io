import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function FeedPage(state) {
  return R`
    <article class="app holygrail feedpage debug">
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
        Main Section (new Post + feed of all followed)
      </article>
      <aside>Aside Section</aside>
      <footer>Footer</footer>
    </article>
  `;
}

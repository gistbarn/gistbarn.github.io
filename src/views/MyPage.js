import {R,X} from '../../node_modules/brutalist-web/r.js';

export default function MyPage(state) {
  return R`
    <article class="app holygrail otherspage debug">
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
        Main Section (new post + my posts)
      </article>
      <aside>Aside Section</aside>
      <footer>Footer</footer>
    </article>
  `;
}

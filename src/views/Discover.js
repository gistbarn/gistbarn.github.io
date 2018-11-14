import {R,X} from '../../node_modules/brutalist-web/r.js';
import {followUser} from '../api.js';

export default function Discover(state) {
  return R`
    <div class=discover>
      <h1>Discover others</h1> 
      <p>
        Follow the followers of your followers, or the followers of those you follow.
    </div>
  `;
}

import PostList from './views/PostList.js';
import NewPost from './views/NewPost.js';
import {getItsGists} from './api.js';

export default async function browseUser(e, login, state) {
  await getItsGists(state, login); 
  state.currentFeed = login;
  NewPost(state);
  PostList(state, {type:'userGists', key:login});
}


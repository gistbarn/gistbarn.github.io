const FEED_EXPIRY = 60*1000*2;

let g, u;

//_test();

async function _test() {
  console.log(await isLoggedIn());
  console.log(await load());
  console.log(await getProfile());
}

export async function isLoggedIn(appState) {
  if ( !g || !u ) {
    await load();
  }
  try {
    const profile = await getProfile();
    appState.profileData = profile.data;
    return true;
  } catch(e) {
    return false;
  }
}

export async function load() {
  const token = localStorage.getItem('token');
  g = new GitHub({token});
  u = g.getUser();
  return {g,u};
}

export async function getProfile(state) {
  const profile = await u.getProfile();
  if ( state ) {
    state.name = profile.data.login;
  }
  return profile;
}

export async function getMyGists(state, {memory: memory = false} = {}) {
  let {data:gists} = await u.listGists();
  if ( ! memory ) {
    const key = getMemoryKey(state);
    gists = gists.filter(g => g.description !== key);
  }
  state.gists = gists;
  return gists;
}

export async function getItsGists(state, user) {
  if ( ! state.userGists ) {
    state.userGists = new Map();
  } else if ( state.userGists.has(user) ) return state.userGists.get(user);
  const {data:gists} = await g.getUser(user).listGists();	
  sortPostsByMostRecent(gists);
  state.userGists.set(user, gists);
  return gists;
}

export async function getBaseFollowers(state) {
  const {followers_url} = state.profileData;
  const followers = await fetch(followers_url).then(r => r.json());
  state.followers = followers;
  return followers;
}

export async function getFollowers(state) {
  if ( state.followers && state.followers.length ) {
    return state.followers;
  }
  const {memory} = await getMemory(state);
  let followers = memory.followers;
  if ( ! followers || ! followers.length ) {
    followers = await getBaseFollowers(state);
    memory.followers = followers;
    await writeMemory(state, memory);
  }
  state.followers = followers;
  return followers;
}

export async function getPeopleToFollow(state) {
  if ( !! state.discover ) {
    return state.discover;
  }
  if ( ! state.followers ) {
    await getFollowers(state);
  } 
  const discover = new Set();
  await Promise.all(state.followers.map(async f => {
    const {following_url} = f;
    const source = following_url.slice(0, following_url.indexOf('{'));
    const following = await fetch(source).then(resp => resp.json());
    following.forEach(f => discover.add(f.login));
  }));
  state.discover = [...discover.values()];
  return state.discover;
}

export async function newPost(submitEvent, state) {
  const form = submitEvent.target;
  const Gist = g.getGist();
  const obj = {
    description: form.description.value,
    public: true,
    files: {
      ['barn.md']: {
        filename: 'barn.md',
        content: form.content.value
      }
    }
  };
  console.log({obj});
  const gist = await Gist.create(obj);
  form.reset();
  return gist;
}

export function sortPostsByMostRecent(posts) {
  posts.forEach(p => {
    const pdate = new Date(p.updated_at);
    p.time = pdate.getTime();
    p.time_ago = timeAgo(pdate);
  });
  posts.sort((a,b) => b.time - a.time);
  return posts;
}

export function timeAgo(date) {
	var seconds = Math.floor((new Date() - date) / 1000);

	var interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return interval + " years";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + " months";
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + " days";
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + " hours";
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + " minutes";
	}
	return Math.floor(seconds) + " seconds";
}

export async function getFeed(state) {
  if ( state && state.feed && ((Date.now() - state.feed.updated) < FEED_EXPIRY) ) {
    return state.feed;
  }
  const feed = [];
  await Promise.all(state.followers.map(async ({login}) => feed.push(...(await getItsGists(state, login)))));
  sortPostsByMostRecent(feed);
  if ( state ) {
    state.feed = feed;
    state.feed.updated = Date.now();
  }
  return feed;
}

export async function getPost(id) {
  const gist = g.getGist(id);
  const content = await gist.read();
  return content.data;
}

export async function followUser(login, state) {
  const user = g.getUser(login);
  const {data:userProfile} = await user.getProfile();
  const {memory} = await getMemory(state);
  let followers = memory.followers;
  if ( ! followers ) {
    followers = await getFollowers(state);
    memory.followers = followers;
  }
  state.followers = followers;
  followers.unshift(userProfile);
  await writeMemory(state, memory);
  return userProfile;
}

export function getMemoryKey(state) {
  const description = `[gistbarn][${state.name}][memory]`;
  return description;
}

export async function getMemory(state) {
  if ( state.memory && state.memoryGist ) {
    return {memory:state.memory, memoryGist:state.memoryGist};
  }
  try {
    const gists = await getMyGists(state, {memory:true});
    const description = getMemoryKey(state);
    let memoryGistItem = gists.find(g => g.description == description);
    const memoryGist = g.getGist(memoryGistItem.id);
    const {data:memoryGistContent} = await memoryGist.read();
    const memory = JSON.parse(memoryGistContent.files['memory.json'].content);
    const retVal = {memoryGist, memory};
    Object.assign(state, retVal);
    return retVal;
  } catch(e) {
    console.warn("Get Memory:", e);
    return await _createMemory(state);
  }
}

async function _createMemory(state) {
  let memory = {};
  let memoryGist = g.getGist();
  memoryGist = await memoryGist.create({
    description: getMemoryKey(state),
    files: {
      ['memory.json']: {
        filename: 'memory.json',
        content: JSON.stringify(memory,null,2)
      }
    }
  });
  return {memory, memoryGist};
}

export async function writeMemory(state, newMemory) {
  let {memory,memoryGist} = await getMemory(state);
  if ( ! memory || ! memoryGist ) {
    ({memory, memoryGist} = await _createMemory(state));
  }
  Object.assign(memory, newMemory);
  memoryGist = await memoryGist.update({
    description: getMemoryKey(state),
    files: {
      ['memory.json']: {
        filename: 'memory.json',
        content: JSON.stringify(memory,null,2)
      }
    }
  });
  return {memory, memoryGist};
}

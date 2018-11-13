let g, u;

//test();

async function test() {
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

export async function getMyGists(state) {
  const {data:gists} = await u.listGists();
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

export async function getFollowers(state) {
  const {followers_url} = state.profileData;
  const followers = await fetch(followers_url).then(r => r.json());
  state.followers = followers;
  return followers;
}

export async function getPeopleToFollow(state) {
  // this is costly so we cache it
}

export async function newPost(submitEvent, state) {
  const form = submitEvent.target;
  const Gist = g.getGist();
  const obj = {
    description: form.description.value,
    public: true,
    files: {
      ['post.md']: {
        filename: 'post.md',
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
  const feed = [];
  await Promise.all(state.followers.map(async ({login}) => feed.push(...(await getItsGists(state, login)))));
  sortPostsByMostRecent(feed);
  if ( state ) {
    state.feed = feed;
  }
  return feed;
}

export async function getPost(id) {
  const gist = g.getGist(id);
  const content = await gist.read();
  return content.data;
}

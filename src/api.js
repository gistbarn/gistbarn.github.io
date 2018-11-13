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
  state.userGists.set(user, gists);
  return gists;
}

export async function getFollowers(state) {
  const {followers_url} = state.profileData;
  const followers = await fetch(followers_url).then(r => r.json());
  state.followers = followers;
  console.log({followers});
  return followers;
}

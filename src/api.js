let g, u;

//test();

async function test() {
  console.log(await load());
  console.log(await getProfile());
}

export async function isLoggedIn(appState) {
  if ( !g || !u ) {
    await load();
  }
  try {
    const profile = await getProfile();
    console.log({profileData:profile.data});
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

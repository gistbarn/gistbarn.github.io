let g, u;

test();

async function test() {
  console.log(await login());
  console.log(await getProfile());
}

export async function login() {
  const token = localStorage.getItem('token');
  g = new GitHub({token});
  u = g.getUser();
  return {g,u};
}
export async function getProfile() {
  return await u.getProfile();
}
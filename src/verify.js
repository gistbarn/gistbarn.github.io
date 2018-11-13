  //import {appState} from './app.js';

  verify();

  async function verify() {
    let token;
    const code = getCode();

    if ( !!code ) {
      ({token} = await fetch(`https://gistbarn.herokuapp.com/authenticate/${code}`).then(r => r.json()));
      console.log({loggedIn:token});
      if( !!token ) {
        document.body.insertAdjacentHTML('beforeEnd', '<p><strong>Logging you in...</strong>');
        localStorage.setItem('token', token);
        //appState.isLoggedIn = true;
        //appState.token = token;
      }
    }
    if ( ! token ) {
      document.body.insertAdjacentHTML('beforeEnd', '<p><strong>An error occurred. Redirecting...</strong>');
    }
    setTimeout( () => location.href = '/', 500 );
  }

  function getCode() {
    try {
      const code = window.location.search.match(/\?code=(.*)/)[1];
      return code;
    } catch(e) { return null; }
  }

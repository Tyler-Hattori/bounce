import React, { useState } from 'react'

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from './refreshToken';

const clientId = '80121214064-nil032tgbsspcmdhr1mepqan77mqa2i0.apps.googleusercontent.com'

function Login(props) {

    const [clickedLoginButton, setClickedLoginButton] = useState(false)
    const [name, setName] = useState()

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully! Welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    props.setLoggedIn(true);
    props.setName(res.profileObj.name)
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login 😢. Please try again`
    );
  };

  
  return (

    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
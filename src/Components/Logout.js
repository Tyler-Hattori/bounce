import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '80121214064-nil032tgbsspcmdhr1mepqan77mqa2i0.apps.googleusercontent.com'

function Logout(props) {

    const [clickedLogoutButton, setClickedLogoutButton] = useState(false)

  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    props.setLoggedIn(false);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
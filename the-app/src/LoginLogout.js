import React, { useState } from 'react'
import Login from './Components/Login.js'
import Logout from './Components/Logout.js'

function LoginLogout() {
    //Below is another way to initialize variables. This way is useful because you also initialize the setVariable() method.
    //I didn't know about this until CodersSB taught it.

    const [loggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState()

    return (
        <div>
            <Login logginIn= {loggedIn} 
                    setLoggedIn = {(bool) => setLoggedIn(bool)} 
                    setName= {(name) => setName(name)}/>
                {loggedIn ?  <p>Hello {name}</p>: <p>Not logged in</p>}
            <Logout loggedIn= {loggedIn} 
                    setLoggedIn = {(bool) => setLoggedIn(bool)}/>
        </div>
    );
}

export default LoginLogout;
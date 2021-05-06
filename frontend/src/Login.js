import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
const Login = () => {
  const handleLogin = async (response) => {
    let config = {
      headers: {
        AUTH_TOKEN: response.tokenId,
      },
    };

    axios
      .post("/api/v1/auth/google", {}, config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const componentClicked = () => {
    console.log("clicked");
  };
  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_GOOGLE}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;

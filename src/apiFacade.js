import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const verifyToken = () => {
    return new Promise((resolve) => {
      const tokenToVerify = getToken();
      var opts = {
        method: "POST",
        headers: {
          "Content-type": "text/plain",
          Accept: "application/json",
        },
        body: tokenToVerify,
      };

      fetch(URL + "/api/login/verify", opts).then((res) => {
        if (res.status === 200) {
          resolve(true);
        }
        if (res.status === 403) {
          localStorage.removeItem("jwtToken");
          resolve(false);
        }
      });
    });
  };

  const login = (user, password, setLoggedIn) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => alert(e.code + ": " + e.message));
        } else {
          alert("network error");
        }
      });
  };

  const createUser = async (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    try {
      const res = await fetch(URL + "/api/register/reg", options);
      const res_1 = await handleHttpErrors(res);
      if (res_1.token != undefined) {
        setToken(res_1.token);
      }
    } catch (err) {
      if (err.status) {
        err.fullError.then((e) => alert(e.code + ": " + e.message));
      } else {
        alert("network error");
      }
    }
  };

  const checkIfUsernameExists = async (user, updateAction) => {
    const options = makeOptions("POST",true,{ username: user });
    try {
     return await fetch(URL + "/api/register/check", options)
        .then(handleHttpErrors)
        .then((data) => updateAction(data));
    } catch (error) {}
  };

  const fetchData = (endpoint, updateAction) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/" + endpoint, options)
      .then(handleHttpErrors)
      .then((data) => updateAction(data));
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(",");
    return loggedIn && roles.includes(neededRole);
  };

  return {
    makeOptions,
    setToken,
    getToken,
    getUserRoles,
    hasUserAccess,
    verifyToken,
    createUser,
    loggedIn,
    login,
    logout,
    fetchData,
    checkIfUsernameExists,
  };
}
const facade = apiFacade();
export default facade;

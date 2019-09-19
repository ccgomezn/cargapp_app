
// ACTION USER
export function login(userInfo) {
  return {
    type: 'user/LOGIN',
    userInfo,
  };
}

export function logout() {
  return {
    type: 'user/LOGOUT_USER',
  };
}

export function getUser() {
  return {
    type: 'user/GETUSER',
  };
}

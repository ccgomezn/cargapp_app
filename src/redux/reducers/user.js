const initialState = {
  isLogged: false,
  info: null,
  error: null,
  token: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/LOGIN':
      return {
        ...state,
        isLogged: true,
        info: action.userInfo,
      };
    case 'user/LOGOUT_USER':
      return {
        ...state,
        isLogged: false,
        info: {},
      };
    default:
      return state;
  }
}


const initialState = {
    user: {},
    isAuth: false,
    profile: {}
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
        return {
            ...state,
            isAuth: action.user && Object.keys(action.user).length > 0 ? true : false,
            user: action.user
        }
    case 'FOLLOW_USER':
    let user = Object.assign({}, state.user)
    user.following.push(action.user_id)
    state.profile && state.profile.user && state.profile.user.followers.push(user._id)
    return {
        ...state,
        user: user
    }
    case 'SET_PROFILE':
    return {
        ...state,
        profile: action.profile
    }
    default:
      return state;
  }
}

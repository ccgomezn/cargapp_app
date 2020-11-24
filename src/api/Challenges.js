export default function (api) {
  return {
    getActiveChallenges: (params = {}) => api.get('challenges/active', params),
    getUserChallenges: (params = {}) => api.get('user_challenges/me', params),
  };
}

export default function (api) {
    return {
        postLocation: data => api.post('user_locations', data),
    };
}

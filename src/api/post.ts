const BASE_URL = 'http://localhost:3002';

const doGetRequest = (endpoint: string) =>
  fetch(`${BASE_URL}/${endpoint}`, {
    method: 'get',
    headers: {
      Authorization: 'Basic ' + btoa('username:password'),
    }
  });

const fetchPosts = () =>
  doGetRequest('posts')
    .then((response) => response.json());

export {
  fetchPosts,
};
// GET /categories      Get all of the categories available for the app.
//                      List is found in categories.js. Feel free to extend this list as you desire.
// GET /:category/posts	Get all of the posts for a particular category.

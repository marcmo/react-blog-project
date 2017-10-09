const BASE_URL = 'http://localhost:3002';

const doGetRequest = (endpoint: string) =>
  fetch(`${BASE_URL}/${endpoint}`, {
    method: 'get',
    headers: {
      Authorization: 'Basic ' + btoa('username:password'),
    }
  });

const fetchPosts = (): Promise<string> =>
  doGetRequest('posts')
    .then((response) => response.json());
const fetchCategories = (): Promise<string> =>
  doGetRequest('categories')
    .then((response) => response.json());

export {
  fetchPosts,
  fetchCategories,
};
// GET /categories      Get all of the categories available for the app.
//                      List is found in categories.js. Feel free to extend this list as you desire.
// GET /:category/posts	Get all of the posts for a particular category.

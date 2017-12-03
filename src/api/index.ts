import { PostType, CommentType } from '../types';
import axios from 'axios';

axios.defaults.headers.common.Authorization = 'OK';
const BASE_URL = 'http://localhost:3001';

const authHeaders = { Authorization: 'Basic ' + btoa('username:password') };
const doAxiosRequest = (method: string, endpoint: string) =>
  axios({
    headers: authHeaders,
    method,
    url: `${BASE_URL}/${endpoint}`,
  })
    .then((response) => response.data);
const doGetRequest = (endpoint: string) => doAxiosRequest('get', endpoint);
const doDeleteRequest = (endpoint: string) => doAxiosRequest('delete', endpoint);
const doPutRequest = (endpoint: string, data: object) =>
  axios({
    headers: authHeaders,
    method: 'put',
    url: `${BASE_URL}/${endpoint}`,
    data,
  })
    .then((response) => response.data);
const doPostRequest = (endpoint: string, data: object): Promise<string> =>
  axios({
    headers: authHeaders,
    method: 'post',
    url: `${BASE_URL}/${endpoint}`,
    data,
  })
    .then((response) => response.data);

// PUT /posts/:id
//   USAGE:
//     Edit the details of an existing post
//   PARAMS:
//     title - String
//     body - String
export const editPost = (postId: string, category: string, newTitle: string, newBody: string): Promise<string> =>
  doPutRequest(`posts/${postId}`, {
    title: newTitle,
    category,
    body: newBody,
  });

// POST /comments
//   USAGE:
//     Add a comment to a post
//   PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.
//
export const createComment = (comment: CommentType): Promise<string> =>
  doPostRequest(`comments`, {
    id: comment.id,
    timestamp: comment.timestamp,
    body: comment.body,
    author: comment.author,
    parentId: comment.parentId,
  });
// DELETE /comments/:id
//   USAGE:
//     sets a comment's deleted flag to 'true'
export const deleteComment = (commentId: string): Promise<string> =>
  doDeleteRequest(`comments/${commentId}`);
// POST /comments/:id
//   USAGE:
//     Used for voting on a comment.
const voteComment = (v: string, commentId: string): Promise<string> =>
  doPostRequest(`comments/${commentId}`, { option: v });
export const upvoteComment = (postId: string): Promise<string> => voteComment('upVote', postId);
export const downvoteComment = (postId: string): Promise<string> => voteComment('downVote', postId);

// PUT /comments/:id
//   USAGE:
//     Edit the details of an existing comment
//
//   PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
export const editComment = (commentId: string, timestamp: number, body: string): Promise<string> =>
  doPutRequest(`comments/${commentId}`, { timestamp, body });
// GET /comments/:id
//   USAGE:
//     Get the details for a single comment
export const fetchComment = (commentId: string): Promise<string> => doGetRequest(`comments/${commentId}`);

// GET /posts
//   USAGE:
//     Get all of the posts. Useful for the main page when no category is selected.
export const fetchPosts = (): Promise<string> => doGetRequest('posts');

// GET /:category/posts
//   USAGE:
//     Get all of the posts for a particular category
export const getPostsInCategory = (categoryId: string): Promise<string> =>
  doGetRequest(`${categoryId}/posts`);

// GET /categories
//   USAGE:
//     Get all of the categories available for the app. List is found in categories.js.
//     Feel free to extend this list as you desire.
export const fetchCategories = (): Promise<string> => doGetRequest('categories');

// GET /posts/:id
//   USAGE:
//     Get the details of a single post
export const fetchPostDetails = (postId: string): Promise<string> => doGetRequest(`posts/${postId}`);

// GET /posts/:id/comments
//   USAGE:
//     Get all the comments for a single post
export const fetchPostComments = (postId: string): Promise<string> => doGetRequest(`posts/${postId}/comments`);

// DELETE /posts/:id
//   USAGE:
//     Sets the deleted flag for a post to 'true'.
//     Sets the parentDeleted flag for all child comments to 'true'.
export const deletePost = (postId: string): Promise<string> => doDeleteRequest(`posts/${postId}`);

// POST /posts
//   USAGE:
//     Add a new post
//
//   PARAMS:
//     id - UUID should be fine, but any unique id will work
//     timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//     title - String
//     body - String
//     author - String
//     category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
// const doPostRequest = (endpoint: string, data: object): Promise<string> =>
export const createPost = (post: PostType): Promise<string> =>
  doPostRequest('posts', {
    id: post.id,
    timestamp: post.timestamp,
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category,
  });

// POST /posts/:id
//   USAGE:
//     Used for voting on a post
//   PARAMS:
//     option - String: Either "upVote" or "downVote"
const vote = (v: string, postId: string): Promise<string> =>
  doPostRequest(`posts/${postId}`, { option: v });
export const upvote = (postId: string): Promise<string> => vote('upVote', postId);
export const downvote = (postId: string): Promise<string> => vote('downVote', postId);

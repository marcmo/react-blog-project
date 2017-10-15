import { Post } from '../types';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

axios.defaults.headers.common.Authorization = 'OK';
const BASE_URL = 'http://localhost:3002';

const doGetRequest = (endpoint: string) =>
  axios.get(`${BASE_URL}/${endpoint}`, {
    headers: {
      Authorization: 'Basic ' + btoa('username:password'),
    }
  })
    .then((response) => response.data);

const fetchPosts = (): Promise<string> => doGetRequest('posts');
const fetchCategories = (): Promise<string> => doGetRequest('categories');
const fetchPostDetails = (postId: string): Promise<string> => doGetRequest(`posts/${postId}`);

const deletePost = (postId: string): Promise<string> =>
  axios({
    method: 'delete',
    url: `${BASE_URL}/posts/${postId}`,
  })
  .then((response) => response.data);

const createPost = (post: Post): Promise<string> =>
  axios({
    method: 'post',
    url: `${BASE_URL}/posts`,
    data: {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
    }
  })
  .then((response) => response.data);

const vote = (v: string, postId: string): Promise<string> =>
  axios({
    method: 'post',
    url: `${BASE_URL}/posts/${postId}`,
    data: {
      option: v,
    }
  })
  .then((response) => response.data);

const upvote = (postId: string): Promise<string> => vote('upVote', postId);
const downvote = (postId: string): Promise<string> => vote('downVote', postId);

export {
  fetchPosts,
  fetchCategories,
  fetchPostDetails,
  upvote,
  downvote,
  deletePost,
  createPost,
};

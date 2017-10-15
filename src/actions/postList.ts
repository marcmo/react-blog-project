import { Post } from '../types';
import {
  UpdatePostListActionType,
} from './types';

// post list actions
export type PostListAction =
  CreatePost |
  AddRemotePosts |
  AddPostToRemote |
  EditPost |
  RemovePost |
  RemovePostRemote |
  FetchPosts |
  FetchPostDetails |
  FetchCategories |
  FetchError |
  PostSelected |
  PostDeselected |
  IncrementPopularity |
  IncrementPopularityRemote |
  DecrementPopularityRemote |
  DecrementPopularity;
export interface AddRemotePosts {
  type: UpdatePostListActionType.ADD_REMOTE_POSTS;
  posts: Array<Post>;
}
export interface CreatePost {
  type: UpdatePostListActionType.CREATE_POST;
  post: Post;
}
export interface AddPostToRemote {
  type: UpdatePostListActionType.ADD_POST_REMOTE;
  post: Post;
}
export interface UpdatedPostContent {
  timestamp?: number;
  title?: string;
  body?: string;
  category?: string;
  votes?: number;
}
export interface EditPost {
  type: UpdatePostListActionType.EDIT_POST;
  postId: string;
  newContent: UpdatedPostContent;
}
export interface PostSelected {
  type: UpdatePostListActionType.POST_SELECTED;
  selectedId: string;
}
export interface PostDeselected {
  type: UpdatePostListActionType.POST_DESELECTED;
}
export interface RemovePost {
  type: UpdatePostListActionType.REMOVE_POST;
  postId: string;
}
export interface RemovePostRemote {
  type: UpdatePostListActionType.REMOVE_POST_REMOTE;
  postId: string;
}
export interface FetchPosts {
  type: UpdatePostListActionType.FETCH_POSTS;
}
export interface FetchPostDetails {
  type: UpdatePostListActionType.FETCH_POST_DETAILS;
  postId: string;
}
export interface FetchCategories {
  type: UpdatePostListActionType.FETCH_CATEGORIES;
}
export interface FetchError {
  type: UpdatePostListActionType.FETCH_ERROR;
  error: string;
}
export interface IncrementPopularity {
  type: UpdatePostListActionType.INCREMENT_POPULARITY;
  id: string;
}
export interface IncrementPopularityRemote {
  type: UpdatePostListActionType.INCREMENT_POPULARITY_REMOTE;
  id: string;
}
export interface DecrementPopularity {
  type: UpdatePostListActionType.DECREMENT_POPULARITY;
  id: string;
}
export interface DecrementPopularityRemote {
  type: UpdatePostListActionType.DECREMENT_POPULARITY_REMOTE;
  id: string;
}
export const decrementPopularityRemote = (id: string): DecrementPopularityRemote => ({
  type: UpdatePostListActionType.DECREMENT_POPULARITY_REMOTE,
  id
});
export const decrementPopularity = (id: string): DecrementPopularity => ({
  type: UpdatePostListActionType.DECREMENT_POPULARITY,
  id
});
export const incrementPopularity = (id: string): IncrementPopularity => ({
  type: UpdatePostListActionType.INCREMENT_POPULARITY,
  id
});
export const incrementPopularityRemote = (id: string): IncrementPopularityRemote => ({
  type: UpdatePostListActionType.INCREMENT_POPULARITY_REMOTE,
  id
});
export interface NewPostArgs {
  title: string;
  author: string;
}
export const createLocalPost = (post: Post): CreatePost => ({
  type: UpdatePostListActionType.CREATE_POST,
  post,
});
export const editPost = (postId: string, newContent: UpdatedPostContent): EditPost => ({
  type: UpdatePostListActionType.EDIT_POST,
  postId,
  newContent,
});
export const selectedPost = (selectedId: string): PostSelected => ({
  type: UpdatePostListActionType.POST_SELECTED,
  selectedId,
});
export const deselectedPost = (): PostDeselected => ({
  type: UpdatePostListActionType.POST_DESELECTED,
});
export const addRemotePosts = (posts: Array<Post>): AddRemotePosts => ({
  type: UpdatePostListActionType.ADD_REMOTE_POSTS,
  posts
});
export const addPostToRemote = (post: Post): AddPostToRemote => ({
  type: UpdatePostListActionType.ADD_POST_REMOTE,
  post
});
export const fetchPosts = (): FetchPosts => ({
  type: UpdatePostListActionType.FETCH_POSTS
});
export const fetchPostDetails = (postId: string): FetchPostDetails => ({
  type: UpdatePostListActionType.FETCH_POST_DETAILS,
  postId,
});
export const fetchCategories = (): FetchCategories => ({
  type: UpdatePostListActionType.FETCH_CATEGORIES,
});
export const fetchError = (error: string): FetchError => ({
  type: UpdatePostListActionType.FETCH_ERROR,
  error
});
export const removePost = (id: string): RemovePost => ({
  type: UpdatePostListActionType.REMOVE_POST,
  postId: id,
});
export const removePostRemote = (id: string): RemovePostRemote => ({
  type: UpdatePostListActionType.REMOVE_POST_REMOTE,
  postId: id,
});

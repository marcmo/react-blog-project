import { Post, Category } from '../types';

// post list actions
export enum UpdatePostListActionType {
  ADD_POST = 'ADD_POST',
  ADD_REMOTE_POSTS = 'ADD_REMOTE_POSTS',
  EDIT_POST = 'EDIT_POST',
  POST_SELECTED = 'POST_SELECTED',
  POST_DESELECTED = 'POST_DESELECTED',
  REMOVE_POST = 'REMOVE_POST',
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POST_DETAILS = 'FETCH_POST_DETAILS',
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_ERROR = 'FETCH_ERROR',
  INCREMENT_POPULARITY = 'INCREMENT_POPULARITY',
  DECREMENT_POPULARITY = 'DECREMENT_POPULARITY',
  INCREMENT_POPULARITY_REMOTE = 'INCREMENT_POPULARITY_REMOTE',
  DECREMENT_POPULARITY_REMOTE = 'DECREMENT_POPULARITY_REMOTE',
}
export type PostListAction =
  AddPost |
  AddRemotePosts |
  EditPost |
  RemovePost |
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
export interface AddPost {
  type: UpdatePostListActionType.ADD_POST;
  title: string;
  author: string;
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
export const addPost = ({title, author}: NewPostArgs): AddPost => ({
  type: UpdatePostListActionType.ADD_POST,
  title,
  author
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
// filter list actions
export enum FilterActionType {
  APPLY_FILTER = 'APPLY_FILTER',
  SHOW_DELETED = 'SHOW_DELETED',
  SHOW_ALL = 'SHOW_ALL',
  ADD_REMOTE_CATEGORIES = 'ADD_REMOTE_CATEGORIES',
}
export type FilterListAction =
  ApplyFilter |
  DeletedFilter |
  RemoveFilter |
  AddRemoteCategories;
export interface ApplyFilter {
  type: FilterActionType.APPLY_FILTER;
  filter: string;
}
export interface RemoveFilter {
  type: FilterActionType.SHOW_ALL;
}
export interface DeletedFilter {
  type: FilterActionType.SHOW_DELETED;
}
export interface AddRemoteCategories {
  type: FilterActionType.ADD_REMOTE_CATEGORIES;
  categories: Array<Category>;
}
export const applyFilter = (f: string): ApplyFilter => ({
  type: FilterActionType.APPLY_FILTER,
  filter: f,
});
export const removeFilter = (): RemoveFilter => ({
  type: FilterActionType.SHOW_ALL
});
export const deletedFilter = (): DeletedFilter => ({
  type: FilterActionType.SHOW_DELETED
});
export const addRemoteCategories = (cats: Array<Category>): AddRemoteCategories => ({
  type: FilterActionType.ADD_REMOTE_CATEGORIES,
  categories: cats,
});

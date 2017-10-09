import { Post } from '../types';

export enum PostUpdateActionType {
  CHANGE_POST_CONTENT = 'CHANGE_POST_CONTENT',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
}
export interface ChangePostContent {
  type: PostUpdateActionType.CHANGE_POST_CONTENT;
  newContent: string;
  postId: string;
}
export interface UpdateCategory {
  type: PostUpdateActionType.UPDATE_CATEGORY;
  newCategory: string;
  postId: string;
}

export type PostUpdateAction =
  ChangePostContent
  | UpdateCategory;

export const updateCategory = (id: string, category: string): UpdateCategory => ({
  type: PostUpdateActionType.UPDATE_CATEGORY,
  newCategory: category,
  postId: id,
});
export const changeContent = (id: string, content: string): ChangePostContent => ({
  type: PostUpdateActionType.CHANGE_POST_CONTENT,
  newContent: content,
  postId: id,
});

// post list actions
export enum UpdatePostListActionType {
  ADD_POST = 'ADD_POST',
  ADD_REMOTE_POSTS = 'ADD_REMOTE_POSTS',
  ADD_POST_WITH_NOTIFICATION = 'ADD_POST_WITH_NOTIFICATION',
  REMOVE_POST = 'REMOVE_POST',
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_ERROR = 'FETCH_ERROR',
  INCREMENT_POPULARITY = 'INCREMENT_POPULARITY',
  DECREMENT_POPULARITY = 'DECREMENT_POPULARITY',
}

export interface AddRemotePosts {
  type: UpdatePostListActionType.ADD_REMOTE_POSTS;
  posts: Array<Post>;
}
export interface AddPost {
  type: UpdatePostListActionType.ADD_POST;
  title: string;
  author: string;
}
export interface RemovePost {
  type: UpdatePostListActionType.REMOVE_POST;
  postId: string;
}
export interface FetchPosts {
  type: UpdatePostListActionType.FETCH_POSTS;
  query: string;
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
export interface DecrementPopularity {
  type: UpdatePostListActionType.DECREMENT_POPULARITY;
  id: string;
}
export const decrementPopularity = (id: string): DecrementPopularity => ({
  type: UpdatePostListActionType.DECREMENT_POPULARITY,
  id
});
export const incrementPopularity = (id: string): IncrementPopularity => ({
  type: UpdatePostListActionType.INCREMENT_POPULARITY,
  id
});
export type PostListAction =
  RemovePost |
  FetchPosts |
  FetchCategories |
  FetchError |
  AddRemotePosts |
  AddPost |
  IncrementPopularity |
  DecrementPopularity;

export const addPost = (title: string, author: string): AddPost => ({
  type: UpdatePostListActionType.ADD_POST,
  title,
  author
});
export const addRemotePosts = (posts: Array<Post>): AddRemotePosts => ({
  type: UpdatePostListActionType.ADD_REMOTE_POSTS,
  posts
});
export const fetchPosts = (query: string): FetchPosts => ({
  type: UpdatePostListActionType.FETCH_POSTS,
  query
});
export const fetchCategories = (): FetchCategories => ({
  type: UpdatePostListActionType.FETCH_CATEGORIES,
});
export const fetchError = (error: string): FetchError => ({
  type: UpdatePostListActionType.FETCH_ERROR,
  error
});
export const doAddPostWithNotification = (title: string, id: string) => ({
  type: UpdatePostListActionType.ADD_POST_WITH_NOTIFICATION,
  post: { id, name },
});
export const removePost = (id: string): RemovePost => ({
  type: UpdatePostListActionType.REMOVE_POST,
  postId: id,
});
// filter list actions
export enum FilterActionType {
  SHOW_CURRENT = 'SHOW_CURRENT',
  SHOW_DELETED = 'SHOW_DELETED',
  SHOW_ALL = 'SHOW_ALL',
  ADD_REMOTE_CATEGORIES = 'ADD_REMOTE_CATEGORIES',
}
export interface ApplyFilter {
  type: FilterActionType.SHOW_CURRENT;
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
  categories: Array<string>;
}
export const applyFilter = (f: string): ApplyFilter => ({
  type: FilterActionType.SHOW_CURRENT,
  filter: f,
});
export const removeFilter = (): RemoveFilter => ({
  type: FilterActionType.SHOW_ALL
});
export const deletedFilter = (): DeletedFilter => ({
  type: FilterActionType.SHOW_DELETED
});
export const addRemoteCategories = (cats: Array<string>): AddRemoteCategories => ({
  type: FilterActionType.ADD_REMOTE_CATEGORIES,
  categories: cats,
});
export type FilterListAction =
  ApplyFilter |
  AddRemoteCategories |
  DeletedFilter |
  RemoveFilter;

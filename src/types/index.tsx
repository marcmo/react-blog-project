import { v4 as uuid } from 'uuid';

export interface RootState {
  readonly postState: PostState;
  readonly categoryState: CategoryState;
}
export interface Entity {
  readonly id: string;
  readonly post: PostType;
}
export interface PostState {
  readonly entities: Array<Entity>;
  readonly comments: Array<CommentType>;
  readonly ids: Array<string>;
  readonly selectedPostId: string | null;
}
export interface Category {
  readonly name: string;
  readonly path: string;
}
export interface CategoryState {
  readonly filter: string;
  readonly categories: Array<Category>;
  readonly onlyDeleted: boolean;
}

export const createCategory = (name: string): Category => ({
  name,
  path: name,
});

export interface PostType {
  id: string; // Unique identifier
  timestamp: number; // Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title: string;
  body: string;
  author: string;
  category: string; // Should be one of the categories provided by the server
  voteScore: number; // Net votes the post has received (default: 1)
  deleted: boolean; // Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
  comments: CommentType[];
}

export const createComment = (postId: string, content: string) => ({
  id: uuid(),
  parentId: postId,
  timestamp: Date.now(),
  body: content,
  author: 'someauthor',
  voteScore: 1,
  deleted: false,
  parentDeleted: false,
});
export interface CommentType {
  id: string; // Unique identifier
  parentId: string; // id of the parent post
  timestamp: number; // Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  body: string; // Comment body
  author: string; // Comment author
  voteScore: number; // Net votes the comment has received (default: 1)
  deleted: boolean; // Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
  parentDeleted: boolean; // Flag for when the the parent post was deleted, but the comment itself was not.
}

export interface LabeledColumn {
  label?: string;
  className: string;
}
export interface Columns {
  title: LabeledColumn;
  author: LabeledColumn;
  comments: LabeledColumn;
  date: LabeledColumn;
  votes: LabeledColumn;
  edit: LabeledColumn;
  delete: LabeledColumn;
}
export interface CommentColumns {
  body: LabeledColumn;
  author: LabeledColumn;
  comments: LabeledColumn;
  date: LabeledColumn;
  votes: LabeledColumn;
  edit: LabeledColumn;
  delete: LabeledColumn;
}

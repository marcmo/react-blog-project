export interface RootState {
  readonly postState: PostState;
  readonly filterState: FilterState;
}
interface Entity {
  readonly id: string;
  readonly post: Post;
}
export interface PostState {
  readonly entities: Array<Entity>;
  readonly ids: Array<string>;
}
export interface FilterState {
  readonly filter: string;
}

export interface Post {
  id: string; // Unique identifier
  timestamp: number; // Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title: string;
  body: string;
  author: string;
  category: string; // Should be one of the categories provided by the server
  voteScore: number; // Net votes the post has received (default: 1)
  deleted: boolean; // Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
  comments: Comment[];
}

export interface Comment {
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
  width: string;
}
export interface Columns {
  title: LabeledColumn;
  author: LabeledColumn;
  comments: LabeledColumn;
  date: LabeledColumn;
  votes: LabeledColumn;
}

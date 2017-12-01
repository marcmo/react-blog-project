import { PostType, CommentType } from '.';

export class BlogPost implements PostType {

  id: string; // Unique identifier
  timestamp: number; // Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title: string;
  body: string;
  author: string;
  category: string; // Should be one of the categories provided by the server
  voteScore: number; // Net votes the post has received (default: 1)
  deleted: boolean; // Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
  comments: CommentType[];

  constructor(
    id: string,
    timestamp: number,
    title: string,
    body: string,
    author: string,
    category: string,
    voteScore: number,
    deleted: boolean,
    comments: CommentType[],
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.title = title;
    this.body = body;
    this.author = author;
    this.category = category;
    this.voteScore = voteScore;
    this.deleted = deleted;
    this.comments = comments;
  }

  // toJSON is automatically used by JSON.stringify
  toJSON(): PostJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign({}, this, {
      // convert fields that need converting
    });
  }

  // fromJSON is used to convert an serialized version
  // of the BlogPost to an instance of the class
  static fromJSON(json: PostJSON | string): BlogPost {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, BlogPost.reviver);
    } else {
      // create an instance of the BlogPost class
      const post = Object.create(BlogPost.prototype);
      // copy all the fields from the json object
      return Object.assign(post, json, {
        id: json.id || '',
        timestamp: json.timestamp || `${Date.now()}`,
        title: json.title || '',
        body: json.body || '',
        author: json.author || 'unknown',
        category: json.category || '',
        voteScore: json.voteScore || 0,
        deleted: json.deleted || false,
        comments: json.comments || [],
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call BlogPost.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? BlogPost.fromJSON(value) : value;
  }
}

// A representation of BlogPost's data that can be converted to
// and from JSON without being altered.
interface PostJSON {
  id?: string; // Unique identifier
  timestamp?: number; // Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  title?: string;
  body?: string;
  author?: string;
  category?: string; // Should be one of the categories provided by the server
  voteScore?: number; // Net votes the post has received (default: 1)
  deleted?: boolean; // Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
  comments?: CommentType[];
}

import * as fns from 'date-fns';
import { v4 as uuid } from 'uuid';
import { Post } from '../types';

export const formatTimestamp = (unixtime: number): string => {
  const d: Date = new Date(unixtime / 1000);
  return `${fns.format(d, 'MM/DD/YY')} (${fns.distanceInWordsToNow(d)})`;
};

export const postTemplate = (t: string, author: string, category: string): Post => {
  const newPost = {
    id: uuid(),
    timestamp: Date.now(),
    title: t,
    body: '',
    author,
    category,
    voteScore: 0,
    deleted: false,
    comments: [],
  };
  return newPost;
};

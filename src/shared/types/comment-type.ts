import { UserData } from './user-data.js';

export type CommentData = {
  commentText: string;
  commentRating: number;
  commentAuthor: UserData;
};


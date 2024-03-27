import { Comment } from '../comment/comment-types';

export interface FeedCreateRequestDTO extends FeedContent {
  coordiId: string;
}

export interface FeedUpdateRequestDTO extends FeedContent {}

export interface FeedUpdateResponseDTO extends FeedContent {}

export interface FeedContent {
  feedTitle: string;
  feedContent: string;
}

export interface Feed extends FeedContent {
  id: number;

  userId: number;
  feedThumbnail: string;
  feedCreatedDate: Date;
  feedUpdatedDate: Date;

  coordiId: number;
  feedLikes: number;
  originWriter: string;

  comments: Comment[];
}

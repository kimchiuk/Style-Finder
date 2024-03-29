export interface FeedCreateRequestDTO extends FeedContent {
  coordiId: string;
}

export interface FeedUpdateRequestDTO extends FeedContent {}

export interface FeedUpdateResponseDTO extends FeedContent {}

export interface FeedUser {
  nickname: string;
  profileImage: string;
}


export interface FeedContent {
  feedTitle: string;
  feedContent: string;
}

export interface FeedComment {
    nickname: string;
    profileImage: string;
    content: string;
    commentCreatedDate: Date;
    commentUpdatedDate: Date;
}

export interface CoordiContainer {
  id: string;
  outerCloth: string;
  upperBody: string;
  lowerBody: string;
  dress: string;
}

export interface FeedInfo extends FeedContent {
  feedId: number;

  user: FeedUser;
  feedThumbnail: string;
  feedCreatedDate: Date;
  feedUpdatedDate: Date;

  outerCloth: string;
  upperBody: string;
  lowerBody: string;
  dress: string;

  feedLikes: number;
  originWriter: string;

  coordiContainer: CoordiContainer;
  comments: FeedComment[];
}

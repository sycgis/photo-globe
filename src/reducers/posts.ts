import Post from "../models/Post";

export interface PostsAction {
  type: string;
  payload: any;
}

export interface PostsState {
  selected?: number; // Index of selected post
  page: {
    start: number; // Index of first post currently on page
    end: number; // Index of last post currently on page
  };
  all: Post[];
}

export const PostTypes = {
  SET_POSTS: 'SET_POSTS',
  ADD_POSTS: 'ADD_POSTS',
  SET_PAGE: 'SET_PAGE',
  SELECT_POST: 'SELECT_POST',
};

const initialState = {
  page: {
    start: 0,
    end: 0,
  },
  all: [],
};

// For testing
import fixturePosts from '../fixtures/posts';
initialState.all = fixturePosts;

const application = (state: PostsState = initialState, action: PostsAction) => {
  switch (action.type) {
    case PostTypes.SET_POSTS:
      return {
        ...state,
        all: action.payload,
      };
    case PostTypes.ADD_POSTS:
      return {
        ...state,
        all: state.all.concat(action.payload),
      };
    default:
      return state;
  }
};

export default application;

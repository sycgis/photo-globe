import { PostTypes, PostsAction } from "../reducers/posts";
import PostModel from "../models/Post";

export const addPosts = (posts: PostModel[]): PostsAction => ({
  type: PostTypes.ADD_POSTS,
  payload: posts,
});

export default {
  addPosts,
}

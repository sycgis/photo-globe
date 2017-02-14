import * as React from 'react';
import PostModel from "../models/Post";

const Post = (post: PostModel) => (
  <div className="post">
    <div className="header">
      <h1 className="title">{post.title}</h1>
      <h2 className="subtitle">{post.subtitle}</h2>
      {post.tags.length ? <span className="tags">tags: {post.tags.join(', ')}</span> : ''}
    </div>
    <div className="body" dangerouslySetInnerHTML={{__html: post.body}}/>
  </div>
);

export default Post;

import React from 'react';

import Comment from './comment';

export default class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map((comment, i) => {
      return (
        <Comment key={i} author={comment.author}>{comment.text}</Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}
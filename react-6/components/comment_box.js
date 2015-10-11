import React from 'react';

import CommentList from './comment_list';
import CommentForm from './comment_form';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: []
    }
  } 

  loadComments() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(this.props.url, err.toString()))
  }

  handleCommentSubmit(comment) {
    // optimistic add
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    fetch(this.props.url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => this.setState({ data: data }))
    .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadComments();
    setInterval(this.loadComments.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
      </div>
    );
  }
}
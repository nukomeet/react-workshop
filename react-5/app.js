var converter = new Showdown.converter();

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: []
    }
  } 

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (data) => {
        this.setState({data: data});
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);

    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({data: data});
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
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

class Comment extends React.Component {
  render() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map((comment) => {
      return (
        <Comment author={comment.author}>{comment.text}</Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});

    this.refs.author.value = '';
    this.refs.text.value = '';
    return;
  } 

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say somehting" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

ReactDOM.render(<CommentBox url="comments.json" pollInterval={2000} />, document.getElementById('content'))
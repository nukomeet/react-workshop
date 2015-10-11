import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/comment_box';

ReactDOM.render(<CommentBox url="/comments.json" pollInterval={2000} />, document.getElementById('content'))


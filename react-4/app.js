class TodoList extends React.Component {
  render() {
    return (
      <ul>{this.props.items.map((item, idx) => {
        return <li key={item.id}>{item} [<a href="#" onClick={this.props.handleDelete.bind(this, item)}>x</a>]</li>;
      })}</ul>
    );
  }
}
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      text: ''
    }
  } 
  handleDelete(itemToDelete, e) {
    var newItems = _.reject(this.state.items, function(item) {
        return item === itemToDelete
    });

    this.setState({items: newItems});
  } 

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';

    this.setState({
      items: nextItems, 
      text: nextText
    });
  } 

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} handleDelete={this.handleDelete.bind(this)} />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input onChange={this.handleChange.bind(this)} value={this.state.text} />
          <button>Add #{(this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('content'))
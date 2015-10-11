class Widget  extends React.Component {
  render() {
    return (
      <div>
        <h5>{this.props.name}</h5>
        {this.props.children}
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Content title="Title">
        <p>{this.props.desc}</p>
        <Widget name="I'm a widget">
          <strong>This is strong</strong>
        </Widget>
      </Content>
    );
  }
}

ReactDOM.render(<App desc="This is my favourite application"/>,
document.getElementById('content'))


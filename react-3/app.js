class ContentToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showDetails: false
    }

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });
  } 
  handleKeyUp(event) {
    console.log(event);
  } 
  render() {
    var details;
    var summaryClassName = 'ContentToggle__Summary';
    if (this.state.showDetails) {
      details = this.props.children;
      summaryClassName += ' ContentToggle__Summary--open';
    }
    return (
      <div className="ContentToggle">
        <h3 tabIndex="0" onClick={this.handleClick.bind(this)} 
        onKeyUp={this.handleKeyUp.bind(this)} className={summaryClassName}>
          {this.props.summary}
        </h3>
        <div className="ContentToggle__Details">{details}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ContentToggle summary="Title">
          <p>This is 1st title</p>
        </ContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<App desc="This is my favourite application"/>, document.getElementById('content'))
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class Counter extends React.Component {
  render(){
    const { value, onIncreaseClick } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    );
  }
}

// Reducer:
function counter(state={count: 0}, action) {
  let count = state.count;
  switch(action.type){
    case 'increase':
      return {count: count+1};
    default:
      return state;
  }
}

// Store:
let store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    value: state.count
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch({type: 'increase'})
  };
}

// Connected Component:
let App = connect(mapStateToProps, mapDispatchToProps)(Counter);

ReactDOM.render(<Provider store={store}><App /></Provider>, 
  document.getElementById('content'));

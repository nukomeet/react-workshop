import React from 'react';

export default class Repo extends React.Component {
  render() {
    const { name, description } = this.props.raw;
    return (
      <div>
        <h3>{ name }</h3>
        <p>{ description }</p>
      </div>
    );
  }
}
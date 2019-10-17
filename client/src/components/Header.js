import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

export default class Header extends Component {
  render() {
    return (
      <div className="ui pointing secondary menu ">
        <Link className="item" to='/'>
          Stream </Link>
        <GoogleAuth></GoogleAuth>
      </div>
    )
  }
}



import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import history from '../history'

const Modal = props => {
  return (
    ReactDOM.createPortal(

      <div onClick={ props.onDismiss } className="ui modals dimmer visible active">
        <div onClick={ (e) => e.stopPropagation() } className="ui basic modal visible active">
          <div className="ui icon header">
            <i className={ `${props.icon} icon` }></i>
            { props.title }
          </div>
          <div className="content">
            <h3>{ props.message }</h3>
          </div>
          <div className="actions">
            { props.action }
          </div>
        </div>
      </div>

      ,
      document.querySelector('#modal')
    )
  );
}




export default Modal;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import flvjs from 'flv.js';

import { fetchStream } from '../../actions'

class StreamShow extends Component {

  constructor (props) {
    super(props);
    this.videoRef = React.createRef();
  }


  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }


  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    if (this.player)
      this.player.destroy();
  }


  buildPlayer = () => {
    const { id } = this.props.match.params;
    console.log(this.videoRef.current)

    if (!this.props.stream || this.player || !this.videoRef.current)
      return;


    this.player = flvjs.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {

    if (!this.props.currentUser)
      return (<div className="ui error message">
        <div className="header">Action Forbidden</div>
        <p>Please login to continue.</p>
      </div>)

    if (!this.props.stream)
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader"><p className="ui header">Loading...</p><p>Make sure if you have selected a valid stream.</p></div>
        </div>);




    //use it when the API response is 'no such stream'
    // if (!this.props.stream)
    //     return (<div className="ui error message">
    //         <div className="header">Action Forbidden</div>
    //         <p>No such stream</p>
    //     </div>)


    return (
      <div>
        <video ref={ this.videoRef } controls={ true } style={ { width: '100%' } } />
        <h1>{ this.props.stream.title }</h1>
        <h3>{ this.props.stream.description }</h3>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    stream: state.streams[ownProps.match.params.id],
    currentUser: state.auth.userId
  })
}


export default connect(mapStateToProps, { fetchStream })(StreamShow)

import React, { Component } from 'react';
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux'

class GoogleAuth extends Component {

  async componentDidMount() {

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '102012306446-ehvnk0dmadffmg9q7tao83prtg67rns1.apps.googleusercontent.com',
        scope: 'profile'

      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.auth.isSignedIn.listen(this.onAuthChange)
        //this.onAuthchange(this.auth.isSignedIn.get())
        //implicitly passes issigned bool value to call back
      })


    });





  }

  onAuthchange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }

  onSignInclick = async () => {
    await this.auth.signIn();
    this.props.signIn(this.auth.currentUser.get().getId())
  }
  onSignOutclick = async () => {
    await this.auth.signOut();
    this.props.signOut();
  }

  renderBtn = () => {
    if (!this.props.isSignedIn)
      return (<button className="ui red google button" onClick={ this.onSignInclick }>
        <i className="google icon"></i>Login With Google</button>)

    return <button className="ui google button" onClick={ this.onSignOutclick }>Log Out
            </button>
  }

  render() {

    return (
      <div className="item right menu">
        { this.renderBtn() }
      </div>
    )
  }

}

const mapStateToProps = (state, ownprops) => {
  return { isSignedIn: state.auth.isSignedIn }

}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)

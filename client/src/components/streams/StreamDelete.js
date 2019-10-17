import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history'


import { deleteStream, fetchStream } from '../../actions'
import Modal from '../Modal';

class StreamDelete extends Component {


    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    deleteStream = () => {

        this.props.deleteStream(this.props.match.params.id)
    }

    onDismiss = () => {
        history.push('/')
    }

    renderAction = () => {
        return (
            <React.Fragment>
                <div className="ui red  cancel inverted button" onClick={ this.onDismiss }>
                    <i className="remove icon"></i>No</div>
                <div className="ui green ok inverted button" onClick={ this.deleteStream }>
                    <i className="checkmark icon"></i>Yes</div>
            </React.Fragment>
        )
    }

    render() {

        if (this.props.stream && !(this.props.currentUser && this.props.currentUser === this.props.stream.userId))
            return (<div className="ui error message">
                <div className="header">Action Forbidden</div>
                <p>Please login to continue.</p>
            </div>)

        if (!this.props.stream)
            return (<div className="ui error message">
                <div className="header">Action Forbidden</div>
                <p>No such stream</p>
            </div>)


        return (

                <Modal title="Delete Stream" icon="delete" action={ this.renderAction() } message={`Are you sure you want to delete the Stream "  ${this.props.stream.title}" ?`}
                    onDismiss={ this.onDismiss }
                />
            
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUser: state.auth.userId
    }

}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete)
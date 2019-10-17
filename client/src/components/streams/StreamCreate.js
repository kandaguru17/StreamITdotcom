import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions'
import StreamForm from './StreamForm'






class StreamCreate extends Component {

    //here it is formvalues cos handle submit gives out values of the form
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }


    render() {

        if (!this.props.currentUser)
            return (<div className="ui error message">
                <div className="header">Action Forbidden</div>
                <p>Please login to continue.</p>
            </div>)

        return (
            <StreamForm onSubmit={ this.onSubmit } />
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return { currentUser: state.auth.userId };
}


export default connect(mapStateToProps, { createStream })(StreamCreate)

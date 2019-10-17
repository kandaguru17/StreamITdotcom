import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm';

class StreamEdit extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.editStream(this.props.match.params.id, formValues)
    }


    render() {

        // if (!this.props.stream)
        //     return (
        //         <div className="ui active inverted dimmer">
        //             <div className="ui text loader">Loading...Please Wait</div>
        //         </div>)


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
            <div>
                <StreamForm initialValues={ this.props.stream } onSubmit={ this.onSubmit } />
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {

    const streamId = ownProps.match.params.id
    return { stream: state.streams[streamId], currentUser: state.auth.userId }

}


export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)

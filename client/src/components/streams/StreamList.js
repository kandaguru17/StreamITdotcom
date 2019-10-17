import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom'
class StreamList extends Component {


    componentDidMount() {
        this.props.fetchStreams();
    }

    renderDeleteEdit = (stream) => {
        if (this.props.currentUser && this.props.currentUser === stream.userId) {
            return (
                <div className="right floated content">
                    <Link to={ `/streams/edit/${stream.id}` } className=" mini ui yellow  button">Edit</Link>
                    <Link to={ `/streams/delete/${stream.id}` } className="ui red mini button">Delete</Link>
                </div>)
        }
    }


    renderStreams = () => {
        return this.props.streams.map(it => {
            return (
                <div className="item" key={ it.id }>
                    { this.renderDeleteEdit(it) }
                    <i className=" large middle video middle aligned icon"></i>
                    <div className="content">
                        <div className="header">
                            <h2><Link to={`/streams/${it.id}`}>{ it.title }</Link></h2>
                        </div>
                        { it.description }
                    </div>
                </div>
            )
        })
    }


    renderCreateStreamBtn = (isSignedIn) => {
        if (isSignedIn)
            return (
                <div className="ui button green right floated content" >
                    <Link style={ { color: "white" } } to="/streams/new">Create Stream</Link>
                </div>
            )
    }

    render() {
        return (
            <div className="ui celled list">
                { this.renderStreams() }
                { this.renderCreateStreamBtn(this.props.isSignedIn) }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { streams: Object.values(state.streams), currentUser: state.auth.userId, isSignedIn: state.auth.isSignedIn }
}


export default connect(mapStateToProps, { fetchStreams })(StreamList)
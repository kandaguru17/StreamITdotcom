import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from './types';

import jsonAPI from '../api/jsonServer'
import history from '../history'

export const signIn = (userId) => {
    return ({
        type: SIGN_IN,
        payload: userId
    })

}

export const signOut = () => {
    return ({
        type: SIGN_OUT,
    })

}

//async requests and use redux-thunk,hence have to dispatch manually to the reducers
export const fetchStreams = () => {
    return async (dispatch) => {

        try {
            const res = await jsonAPI.get('/streams')
            dispatch({ type: FETCH_STREAMS, payload: res.data })
        } catch (error) {
            console.log(error)
            dispatch({ type: 'ERROR' })
        }
    }
}

export const fetchStream = (id) => {
    return async (dispatch) => {
        try {
            const res = await jsonAPI.get(`/streams/${id}`)
            dispatch({ type: FETCH_STREAM, payload: res.data })
        } catch (error) {
            console.log(error)
            dispatch({ type: 'ERROR' })
        }
    }
}


export const editStream = (id, formValues) => {
    return async (dispatch) => {
        try {
            const res = await jsonAPI.put(`/streams/${id}`, formValues)
            dispatch({ type: EDIT_STREAM, payload: res.data })
            history.push('/')
        } catch (error) {
            console.log(error)
            dispatch({ type: 'ERROR' })
        }

    }
}

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        try {
            const { userId } = getState().auth
            const res = await jsonAPI.post('/streams', { ...formValues, userId })
            dispatch({ type: CREATE_STREAM, payload: res.data });
            history.push('/')

        } catch (error) {
            console.log(error)
            dispatch({ type: 'ERROR' })
        }

    }

}

export const deleteStream = (id) => {
    return async (dispatch) => {
        try {
            await jsonAPI.delete(`/streams/${id}`);
            dispatch({ type: DELETE_STREAM, payload: id });
            history.push('/');
        } catch (error) {
            console.log(error)
            dispatch({ type: 'ERROR' })
        }

    }

}
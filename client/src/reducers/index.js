import { reducer as formReducer } from 'redux-form'

import { combineReducers } from 'redux';
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';



const INTIAL_STATE = {
  isSignedIn: null,
  userId: null
}

export const isSignedReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload }

    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null }

    default:
      return state
  }
}



export const streamReducer = (state = {}, action) => {
  switch (action.type) {


    case FETCH_STREAMS:
      //action.payload is result of the API call -> all streams
      //easy to work on objects than arrays hence the conversion
      const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['id']]: it })))
      return { ...state, ...arrToObj }

    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }

    case DELETE_STREAM:
      //taking a copy of the old state
      const newState = { ...state }
      //deleting the stream in the copied state
      delete newState[action.payload]
      return newState;

    default:
      return state;

  }
}

export default combineReducers({
  auth: isSignedReducer,
  form: formReducer,
  streams: streamReducer
})


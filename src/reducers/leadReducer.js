// leadReducer.js
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function leadReducer(state = initialState.leads, action){
  switch(action.type){

    case actionTypes.CREATE_LEAD_SUCCESS:
      return [...state,
      Object.assign({}, action.lead)];

    case actionTypes.LOAD_LEADS_SUCCESS:
      return action.leads;

    default:
      return state;
  }
}
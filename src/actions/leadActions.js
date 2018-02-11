// leadActions.js

import * as actionTypes from './actionTypes';
import leadApi from '../api/leadboardApi';
import * as ajaxStatus from './ajaxStatusActions';

export function createLeadSuccess(lead){
	return {type: actionTypes.CREATE_LEAD_SUCCESS, lead:lead };
}

export function loadLeadsSuccess(leads){
	return {type: actionTypes.LOAD_LEADS_SUCCESS, leads: leads};
}

export function loadLeads(){
	return function(dispatch){
		dispatch(ajaxStatus.beginAjaxCall(actionTypes.LOAD_LEADS));
		return leadApi.getAllLeads().then((leads) => {
			dispatch(loadLeadsSuccess(leads));
		}).catch(error => {
			dispatch(ajaxStatus.abortAjaxCall(actionTypes.LOAD_LEADS));
			throw(error);
		});
	};
}

export function saveLead(lead){
	return function(dispatch, getState){
		dispatch(ajaxStatus.beginAjaxCall(actionTypes.CREATE_LEAD));
		let request = {
			lead: lead
		};

		return leadApi.saveLead(request).then((lead) => {
			dispatch(createLeadSuccess(lead));
		}).catch(error => {
			dispatch(ajaxStatus.abortAjaxCall(actionTypes.CREATE_LEAD));
			throw(error);
		});
	};
}
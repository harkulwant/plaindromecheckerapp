// ajaxStatusActions.js

import * as types from './actionTypes';

export function beginAjaxCall(request){
	return {type: types.BEGIN_AJAX_CALL, request: request};
}

export function abortAjaxCall(request){
	return {type: types.ABORT_AJAX_CALL, request: request};
}
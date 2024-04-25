import {
  API_SUCCESS,
  API_FAIL,
  GET_EVENTS,
  ADD_NEW_EVENT,
  // ADD_EVENT_SUCCESS,
  // ADD_EVENT_FAIL,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from "./actionTypes";

export const getEvents = () => ({
  type: GET_EVENTS,
});

export const apiSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
});

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
});


export const addNewEvent = event => ({
  type: ADD_NEW_EVENT,
  payload: event,
});

// export const addEventSuccess = event => ({
//   type: ADD_EVENT_SUCCESS,
//   payload: event,
// });

// export const addEventFail = error => ({
//   type: ADD_EVENT_FAIL,
//   payload: error,
// });

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event,
});

export const updateEventSuccess = event => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAIL,
  payload: error,
});

export const deleteEvent = event => ({
  type: DELETE_EVENT,
  payload: event,
});

export const deleteEventSuccess = event => ({
  type: DELETE_EVENT_SUCCESS,
  payload: event,
});

export const deleteEventFail = error => ({
  type: DELETE_EVENT_FAIL,
  payload: error,
});

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getCategoriesFail = error => ({
  type: GET_CATEGORIES_FAIL,
  payload: error,
});

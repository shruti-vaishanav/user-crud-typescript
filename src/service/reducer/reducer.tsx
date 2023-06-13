import {
    // SET_USER_DATA,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR
} from "../constant";
import { userReducerType } from "../../interfaces/user.interface";

const initialstate: userReducerType = {
    userList: [],
    featching: false,
    error: {}
}

export function User(state = initialstate, action: any) {
    switch (action.type) {
        case GET_USER_REQUEST: return { ...state, featching: true, };
        case GET_USER_SUCCESS: return { ...state, userList: action.payload, featching: false, };
        case GET_USER_ERROR: return { ...state, error: action.payload, featching: false, };

        case SET_USER_REQUEST: return { ...state, featching: true, };
        case SET_USER_SUCCESS: return { ...state, userList: action.payload, featching: false, };
        case SET_USER_ERROR: return { ...state, error: action.payload, featching: false, };

        case UPDATE_USER_REQUEST: return { ...state, featching: true, };
        case UPDATE_USER_SUCCESS: return { ...state, userList: action.payload, featching: false, };
        case UPDATE_USER_ERROR: return { ...state, error: action.payload, featching: false, };

        case DELETE_USER_REQUEST: return { ...state, featching: true, };
        case DELETE_USER_SUCCESS: return { ...state, userList: action.payload, featching: false, };
        case DELETE_USER_ERROR: return { ...state, error: action.payload, featching: false, };
        default: return state
    }
}
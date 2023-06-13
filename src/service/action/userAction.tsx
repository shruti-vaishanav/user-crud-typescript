import {
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
import { userObj } from "../../constant/common";
import { InputData, userDataType } from "../../interfaces/user.interface";

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (payload: InputData[]) => ({ type: GET_USER_SUCCESS, payload });
const getUserFailure = (errors: any) => ({ type: GET_USER_ERROR, errors });


export const getUsers = () => async (dispatch: any) => {
    new Promise((resolve: any, reject: any) => {
        dispatch(getUserRequest());
        try {
            if (userObj) {
                dispatch(getUserSuccess(userObj));
                resolve(userObj);
            }
        } catch (e) {
            dispatch(getUserFailure(e));
            reject();
        }
    });
}
const setUserRequest = () => ({ type: SET_USER_REQUEST });
const setUserSuccess = (payload: InputData[]) => ({ type: SET_USER_SUCCESS, payload });
const setUserFailure = (message: any) => ({ type: SET_USER_ERROR, message });


export const setUser = (oldarray: userDataType[], modalInputdata: InputData) => async (dispatch: any) => {
    new Promise((resolve: any, reject: any) => {
        oldarray.push(modalInputdata)
        dispatch(setUserRequest());
        try {
            if (oldarray) {
                dispatch(setUserSuccess(oldarray));
                resolve(oldarray);
            }
        } catch (e) {
            dispatch(setUserFailure(e));
            reject();
        }
    });
}

const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (payload: InputData[]) => ({ type: UPDATE_USER_SUCCESS, payload });
const updateUserFailure = (message: any) => ({ type: UPDATE_USER_ERROR, message });

export const updateUser = (userarray: userDataType[], modalInputdata: InputData, updatedata: InputData) => async (dispatch: any) => {
    new Promise((resolve, reject) => {
        const findname = userarray.findIndex((row: any) => row.name === updatedata.name)
        userarray.splice(findname, 1, (modalInputdata));
        dispatch(updateUserRequest());
        try {
            if (userarray) {
                dispatch(updateUserSuccess(userarray));
                resolve(userarray);
            }
        } catch (e) {
            dispatch(updateUserFailure(e));
            reject();
        }
    });
}
const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
const deleteUserSuccess = (payload: InputData[]) => ({ type: DELETE_USER_SUCCESS, payload });
const deleteUserFailure = (message: any) => ({ type: DELETE_USER_ERROR, message });

export const deletUser = (deletuserdata: InputData, userarray: userDataType[]) => async (dispatch: any) => {
    new Promise((resolve: any, reject: any) => {
        const findname = userarray.findIndex((row: any) => row.name === deletuserdata.name)
        userarray.splice(findname, 1);
        dispatch(deleteUserRequest());
        try {
            if (userarray) {
                dispatch(deleteUserSuccess(userarray));
                resolve(userarray);
            }
        } catch (e) {
            dispatch(deleteUserFailure(e));
            reject();
        }
    });
}


//make function in action file
//return data and type
//add constant and use constant in action
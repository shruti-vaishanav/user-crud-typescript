interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}
type userDataType = {
    [x: string]: any;
    name: string,
    email: string,
    status: string
}
type InputData = {
    name: string,
    email: string,
    status: string
}

interface userReducerType {
    userList: [],
    featching: boolean,
    error: string | any
}
interface UserType {
    User: userReducerType
}
export { Column, userReducerType, UserType, userDataType, InputData };
import type { Dispatch, ChangeEvent, FC } from 'react'
import { useEffect, useState } from "react";
import { TextField, Box, Button, Grid, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUser, updateUser } from "../../service/action/userAction";
import { InputData, userDataType, UserType, ModalProps } from '../../interfaces/user.interface';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 4,
    p: 4,
};

const UserModal: FC<ModalProps> = ({ updatedata, handleModal }: ModalProps) => {

    const dispatch: Dispatch<any> = useDispatch();
    const data = useSelector((state: UserType) => state.User)
    console.log('state: ', data);

    const [modalInputdata, setModalInputData] = useState<InputData>({
        name: '',
        email: '',
        status: '',
    });

    useEffect(() => {
        if (updatedata) {
            setModalInputData({
                name: updatedata?.name,
                email: updatedata?.email,
                status: updatedata?.status
            })
        }
    }, [updatedata]);

    const InputValues = (e: ChangeEvent<HTMLInputElement>) => {
        setModalInputData({
            ...modalInputdata,
            [e.target.name]: e.target.value,
        });
    }

    const submit = async () => {
        if (updatedata?.name) {
            try {
                const userarray: userDataType[] = data.userList
                // const userarray: Array<userDataType> = data.userList

                dispatch(updateUser(userarray, modalInputdata, updatedata));
            } catch (e) {
                console.log('e: ', e);
            }
        } else {
            try {
                const oldarray: userDataType[] = data.userList
                console.log('oldarray: ', oldarray);
                // dispatch(setUser(data.userList.push(modalInputdata)));
                dispatch(setUser(oldarray, modalInputdata));
            } catch (error) {
                console.log("eAdd Error", error);
            }
        }
        handleModal()
        dispatch(getUsers());
    }

    return (
        <>
            <Grid container>
                <Box sx={style}>
                    <Grid container rowSpacing={1} >
                        <Grid lg={6} md={6} paddingRight={4}>
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Name"
                                name='name'
                                variant="standard"
                                onChange={InputValues}
                                value={modalInputdata.name}
                            />
                        </Grid>
                        <Grid lg={6} md={6}>
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Email"
                                name='email'
                                variant="standard"
                                onChange={InputValues}
                                value={modalInputdata.email}
                            />
                        </Grid>
                        <Grid lg={6} md={6} marginTop={1} paddingRight={4}>
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Status"
                                name='status'
                                variant="standard"
                                onChange={InputValues}
                                value={modalInputdata.status}
                            />
                        </Grid>

                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            onClick={() => submit()}
                        >
                            Submit
                        </Button>
                    </div>
                </Box>
            </Grid>
        </>
    )
}

export default UserModal;
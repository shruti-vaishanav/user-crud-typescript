import React, { useLayoutEffect, useState, } from 'react';
import type { Dispatch, ChangeEvent, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    TableBody,
    TableCell,
    Modal,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Table,
    Paper,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserModal from './userModal';
import { deletUser, getUsers } from '../../service/action/userAction';
//interface
import { Column, InputData, UserType, userDataType } from '../../interfaces/user.interface';


const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'right',
    },
];

const UserTable: FC = () => {
    const data = useSelector((state: UserType) => state.User);
    console.log('data: ', data);
    const dispatch: Dispatch<any> = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [updatedata, setUpdatedata] = useState<InputData>({
        name: '',
        email: '',
        status: ''
    });
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleModal = () => setOpen(true);
    const handleCloseModal = () => {
        setOpen(false);
        setUpdatedata({
            name: '',
            email: '',
            status: ''
        });
    };

    const handleEditEpisode = (row: InputData) => {
        handleModal();
        setUpdatedata(row);
    }

    const handleChangePage = (newPage: any) => {
        // console.log('event: ', event);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('event: ', event);
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useLayoutEffect(() => {
        dispatch(getUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteUser = (deletuserdata: InputData) => {
        const userarray: userDataType[] = data.userList
        console.log('userarray: ', userarray);
        dispatch(deletUser(deletuserdata, userarray));
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer >
                    <Typography mb={6} sx={{ display: 'flex', paddingRight: '68px', marginTop: '20px' }}>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h4"
                            id="tableTitle"
                            component="p"
                            paddingLeft={'60px'}
                        >
                            Episode Table
                        </Typography>
                        <Button variant="contained"
                            // endIcon={<AddIcon />}
                            onClick={handleModal}
                        >
                            Create
                        </Button>
                    </Typography>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.userList && data?.userList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: InputData, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell align='left'>{row.status}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditEpisode(row)} ><EditIcon /></IconButton>
                                                <IconButton onClick={() => deleteUser(row)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.userList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserModal
                    updatedata={updatedata}
                    handleModal={() => handleCloseModal()}
                />
            </Modal>
        </>
    );
}

export default UserTable

import { Grid, Container, Avatar, Button, Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import * as database from '../../../database';
import { FireStoreConst } from '../../../constants/AppConstants';
import './UserPage.scss';
import { lightBlue } from '@mui/material/colors';
import { generate } from "get-initials"
import SnackbarElement from '../../../components/elements/snack-bar/SnackbarElement';


const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleUpdate = async (status, id) => {
        setIsUpdated(false);
        const updated = await database.update(FireStoreConst.USER_DOC,
            { isActive: status }, id);
        if (updated) {
            setIsUpdated(true);
            updateUsers();
        }
    }

    const updateUsers = () => {
        (async () => {
            const data = await database.load(FireStoreConst.USER_DOC);
            setUsers(data);
        })();

    }
    useEffect(() => {
        updateUsers();
    }, []);

    return <>
        <Container maxWidth={"xl"}>
            <Grid container spacing={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 3,
                }} >
                <Grid item xs>
                    <div style={{ fontWeight: 700, verticalAlign: 'top' }}>
                        <span>App Users</span>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 1, md: 1 }} sx={{ mt: 3 }}>
                {users && Array.from(users).map((user, index) => (
                    <Grid key={index} item xs
                        sx={{ border: 1, borderColor: '#e3e3e3', m: 1, borderRadius: 1, p: 3 }}>
                        <div className="user-avatar">

                            <Avatar sx={{ bgcolor: lightBlue[800], width: 64, mt: 2, height: 64, textAlign: 'center' }} alt={user.firstname + ' ' + user.lastname}>
                                {generate(user.firstname, user.lastname)}
                            </Avatar>
                        </div>
                        <div className="user-title">
                            {user.firstname} {user.lastname}
                        </div>
                        <div className="user-text">
                            {user.email}
                        </div>
                        <div className="user-text">
                            <b>Status:</b>
                            {user.isActive ?
                                <div style={{ color: 'green', m: 1, fontWeight: 700 }}>Active</div>
                                :
                                <div style={{ color: 'red', m: 1, fontWeight: 700 }}>Inctive</div>

                            }
                        </div>

                        <div className="user-button">
                            {user.isActive ?
                                <Button variant="outlined" color="error" disableElevation
                                    onClick={() => handleUpdate(!user.isActive, user.id)}
                                >
                                    Locked Account
                                </Button>
                                :
                                <Button variant="contained" color="primary" disableElevation
                                    onClick={() => handleUpdate(!user.isActive, user.id)}>
                                    Enable Account
                                </Button>
                            }
                        </div>
                    </Grid>
                ))}
            </Grid>
            {isUpdated && <SnackbarElement isOpen={isUpdated} message={'You have successfully enabled account.'} />}

        </Container>
    </>
}
export default UsersPage;
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import Header from '../Header/Header';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            dataEditUser: {
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            },
        };
    }

    async componentDidMount() {
        this.getAllUserFromReact();
    }

    openAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    cancelModelUser = () => {
        this.setState({
            isOpenModalUser: false,
        });
    };

    openEditUser = (data) => {
        this.setState({
            isOpenModalEditUser: true,
            dataEditUser: data,
        });
    };

    cancelModelEditUser = () => {
        this.setState({
            isOpenModalEditUser: false,
        });
    };

    // service call api - re-render the component
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                userData: response.user,
            });
        }
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode === 0) {
                this.cancelModelUser();
                this.getAllUserFromReact();
                return response;
            }
            return response;
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteUser = async (userId) => {
        try {
            let response = await deleteUserService(userId);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                // re-render if deleteUser successfully
                this.getAllUserFromReact();
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = async (data) => {
        try {
            console.log('what', data);
            let response = await editUserService(data);
            if (response && response.errCode === 0) {
                this.cancelModelUser();
                this.getAllUserFromReact();
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let { userData, dataEditUser } = this.state;
        return (
            <div className="users-container">
                <div className="title text-content">Manage users</div>
                <div className="m-1">
                    {this.state.isOpenModalUser && (
                        <ModalUser isOpen={this.state.isOpenModalUser} cancelModelUser={this.cancelModelUser} createNewUser={this.createNewUser} />
                    )}

                    {this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            cancelModelEditUser={this.cancelModelEditUser}
                            dataEditUser={dataEditUser}
                            handleEditUser={this.handleEditUser}
                        />
                    )}
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => {
                            this.openAddNewUser();
                        }}
                    >
                        <i className="fas fa-plus"></i>
                        <span className="mx-1">Add new user</span>
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Adress</th>
                                <th>Actions</th>
                            </tr>
                            {userData &&
                                userData.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        this.openEditUser(item);
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // Life cycle
    // 1. Run construct => init state
    // 2. Did mount (set state)
    // 3. Render
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

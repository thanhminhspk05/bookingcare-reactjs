import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManageAdmin.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from './ModalEditUser';
// import Header from '../Header/Header';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalCreateUser: false,
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
            isOpenModalCreateUser: true,
        });
    };

    cancelModelUser = () => {
        this.setState({
            isOpenModalCreateUser: false,
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
                <div className="m-3">
                    {this.state.isOpenModalCreateUser && (
                        <ModalCreateUser isOpen={this.state.isOpenModalCreateUser} cancelModelUser={this.cancelModelUser} createNewUser={this.createNewUser} />
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
                    <button
                        className="btn btn-primary px-3 mx-2"
                        onClick={() => {
                            this.openEditUser(this.props.userInfo);
                        }}
                    >
                        <i className="fas fa-pencil-alt"></i>
                        <span className="mx-1">Edit my infomation</span>
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th style={{ width: '50px' }}>Number</th>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Adress</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            {userData &&
                                userData.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{item.roleId}</td>

                                            <td style={{ width: '150px' }}>
                                                <button>Details</button>
                                                <button className="mx-2" onClick={() => this.handleDeleteUser(item.id)}>
                                                    Delete
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

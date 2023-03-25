import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from './ModalEditUser';
// import Header from '../Header/Header';

class UserDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
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
        if (userData) {
            userData = userData.filter((item) => item.roleId === 'patient');
        }
        return (
            <div className="users-container">
                <div className="title text-content">Manage users</div>
                <div className="m-3">
                    {this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            cancelModelEditUser={this.cancelModelEditUser}
                            dataEditUser={dataEditUser}
                            handleEditUser={this.handleEditUser}
                        />
                    )}
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-primary px-3"
                            onClick={() => {
                                this.openEditUser(this.props.userInfo);
                            }}
                        >
                            <i className="fas fa-pencil-alt"></i>
                            <span className="mx-1">Edit my infomation</span>
                        </button>
                    </div>
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
                                <th>Details</th>
                            </tr>
                            {userData &&
                                userData.map((item, index) => {
                                    if (item.roleId === 'patient') {
                                    }
                                    return (
                                        <tr key={item.id}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>

                                            <td style={{ width: '50px' }}>
                                                <button>Details</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDoctor);
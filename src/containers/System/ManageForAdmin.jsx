import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageForAdmin.scss';
import { getAllUsers, createNewUserService, editUserService } from '../../services/userService';
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from './ModalEditUser';
import ModalDetails from './ModalDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedMessage } from 'react-intl';
import TableUsersForAdmin from './TableUsersForAdmin';

class ManageForAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalCreateUser: false,
            isOpenModalEditUser: false,
            isOpenModalDetails: false,
            dataEditUser: {},
            dataDetailsUser: {},
        };
    }

    // RE-RENDER LIST USER
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                userData: response.user,
            });
        }
    };

    // UPDATE INPUT
    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    // CREATE USER
    openAddNewUser = () => {
        this.setState({
            isOpenModalCreateUser: true,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode === 0) {
                this.cancelModalCreateUser();
                this.getAllUserFromReact();
                toast.success('Created information successfully!');
                return response;
            }
            return response;
        } catch (e) {
            console.log(e);
        }
    };

    cancelModalCreateUser = () => {
        this.setState({
            isOpenModalCreateUser: false,
        });
    };

    // UPDATE USER
    openEditUser = (data) => {
        this.setState({
            isOpenModalEditUser: true,
            dataEditUser: data,
        });
    };

    cancelModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: false,
        });
    };

    handleEditUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errCode === 0) {
                this.cancelModalEditUser();
                this.getAllUserFromReact();
                toast.success('Updated information successfully!');
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
        }
    };

    // FULL INFOMATION USER
    openDetailsUser = (data) => {
        this.setState({
            isOpenModalDetails: true,
            dataDetailsUser: data,
        });
    };

    cancelDetailsUser = () => {
        this.setState({ isOpenModalDetails: false });
    };

    render() {
        let { dataEditUser, dataDetailsUser } = this.state;
        let { language } = this.props;

        return (
            <div className="users-container">
                <div className="title text-content">
                    <FormattedMessage id="system.manage-for-admin" />
                </div>
                <div className="m-3">
                    <ModalCreateUser
                        isOpen={this.state.isOpenModalCreateUser}
                        cancelModalCreateUser={this.cancelModalCreateUser}
                        createNewUser={this.createNewUser}
                    />

                    {this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            cancelModalEditUser={this.cancelModalEditUser}
                            dataEditUser={dataEditUser}
                            handleEditUser={this.handleEditUser}
                        />
                    )}

                    <ModalDetails isOpen={this.state.isOpenModalDetails} cancelDetailsUser={this.cancelDetailsUser} dataDetailsUser={dataDetailsUser} />

                    <button
                        className="btn btn-primary px-3"
                        onClick={() => {
                            this.openAddNewUser();
                        }}
                    >
                        <i className="fas fa-plus"></i>
                        <span className="mx-1">
                            <FormattedMessage id="system.add" />
                        </span>
                    </button>
                    <button
                        className="btn btn-primary px-3 mx-2"
                        onClick={() => {
                            this.openEditUser(this.props.userInfo);
                        }}
                    >
                        <i className="fas fa-pencil-alt"></i>
                        <span className="mx-1">
                            <FormattedMessage id="system.edit" />
                        </span>
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <TableUsersForAdmin openDetailsUser={this.openDetailsUser} handleDeleteUser={this.handleDeleteUser} language={language} />
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageForAdmin);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalEditUser from './ModalEditUser';
import ModalDiagnose from './ModalDiagnose';
import './ManageForAdmin.scss';
import TableUsersForDoctor from './TableUsersForDoctor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers, editUserService } from '../../services/userService';

class ManageForDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalEditUser: false,
            isOpenModalDiagnose: false,
            dataEditUser: {},
            dataDiagnose: {},
            userData: [],
        };
    }

    componentDidMount() {
        this.getAllUserFromReact();
    }

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
                toast.success('Updated information successfully!');
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
        }
    };

    openModalDiagnose = (data) => {
        this.setState({
            isOpenModalDiagnose: true,
            dataDiagnose: data,
        });
    };

    cancelModalDiagnose = () => {
        this.setState({
            isOpenModalDiagnose: false,
        });
    };

    render() {
        let { dataEditUser, dataDiagnose, userData } = this.state;

        return (
            <div className="users-container">
                <div className="title text-content">
                    <FormattedMessage id="system.manage-for-doctor" />
                </div>
                <div className="m-3">
                    {this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            cancelModalEditUser={this.cancelModalEditUser}
                            dataEditUser={dataEditUser}
                            handleEditUser={this.handleEditUser}
                        />
                    )}
                    {this.state.isOpenModalDiagnose && (
                        <ModalDiagnose isOpen={this.state.isOpenModalDiagnose} cancelModalDiagnose={this.cancelModalDiagnose} dataDiagnose={dataDiagnose} />
                    )}

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-primary px-3"
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
                </div>
                <div className="user-table mt-3 mx-1">
                    {userData.length > 0 && <TableUsersForDoctor openModalDiagnose={this.openModalDiagnose} dataDiagnose={dataDiagnose} userData={userData} />}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageForDoctor);

import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import ModalEditUser from './ModalEditUser';
import ModalDiagnose from './ModalDiagnose';
import './ManageForAdmin.scss';
import TableUsers from './TableUsers';
import Pagination from './Pagination';

class ManageForDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalEditUser: false,
            isOpenModalDiagnose: false,
            dataEditUser: {},
            dataDiagnose: {},
            userData: [],
            currentPage: 1,
            usersPerPage: 10,
        };
    }

    async componentDidMount() {
        this.getAllUserFromReact();
    }

    // RE-RENDER LIST USER
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        let newuserData = response.user.filter((item) => item.roleId === 'patient');
        if (response && response.errCode === 0) {
            this.setState({
                userData: newuserData,
            });
        }
    };

    openEditUser = (data) => {
        this.setState({
            isOpenModalEditUser: true,
            dataEditUser: data,
        });
    };

    cancelModalEditUser = () => {
        this.setState({
            isOpenModalDiagnose: false,
        });
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

    // CHANGE PAGE
    paginate = (numberPage) => {
        this.setState({
            currentPage: numberPage,
        });
    };

    prevPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1,
        });
    };

    nextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
        });
    };

    render() {
        let { userData, dataEditUser, dataDiagnose, currentPage, usersPerPage } = this.state;
        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
        return (
            <div className="users-container">
                <div className="title text-content">Manage for doctor</div>
                <div className="m-3">
                    {this.state.isOpenModalEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            cancelModelEditUser={this.cancelModelEditUser}
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
                            <span className="mx-1">Edit my infomation</span>
                        </button>
                    </div>
                </div>
                <div className="user-table mt-3 mx-1">
                    <TableUsers currentUsers={currentUsers} openDetailsUser={this.openDetailsUser} handleDeleteUser={this.handleDeleteUser} />
                    <div className="d-flex justify-content-center">
                        {currentPage > 1 ? (
                            <button
                                style={{
                                    padding: '4px 8px',
                                    border: 'none',
                                    margin: '20px 5px',
                                    background: '#ccc',
                                }}
                                onClick={() => {
                                    this.prevPage();
                                }}
                            >
                                Previous
                            </button>
                        ) : (
                            <button
                                style={{
                                    padding: '4px 8px',
                                    border: 'none',
                                    margin: '20px 5px',
                                    background: '#ccc',
                                }}
                                onClick={() => {
                                    this.prevPage();
                                }}
                                disabled
                            >
                                Previous
                            </button>
                        )}

                        <Pagination usersPerPage={usersPerPage} totalUsers={userData.length} paginate={this.paginate} />
                        {currentPage < userData.length / usersPerPage ? (
                            <button
                                style={{
                                    padding: '4px 8px',
                                    border: 'none',
                                    margin: '20px 5px',
                                    background: '#ccc',
                                }}
                                onClick={() => {
                                    this.nextPage();
                                }}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                style={{
                                    padding: '4px 8px',
                                    border: 'none',
                                    margin: '20px 5px',
                                    background: '#ccc',
                                }}
                                onClick={() => {
                                    this.nextPage();
                                }}
                                disabled
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
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

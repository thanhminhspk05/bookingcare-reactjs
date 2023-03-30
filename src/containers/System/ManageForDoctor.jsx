import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import ModalEditUser from './ModalEditUser';
import ModalDiagnose from './ModalDiagnose';
import './ManageForAdmin.scss';
import TableUsersForDoctor from './TableUsersForDoctor';

class ManageForDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalEditUser: false,
            isOpenModalDiagnose: false,
            dataEditUser: {},
            dataDiagnose: {},
            userData: [],
            search: '',
        };
    }

    async componentDidMount() {
        this.getAllUserFromReact();
    }

    // RE-RENDER LIST USER
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        let newuserData = response.user.filter((item) => item.roleId === 'Patient');
        if (response && response.errCode === 0) {
            this.setState({
                userData: newuserData,
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
        let { userData, dataEditUser, dataDiagnose, currentPage, usersPerPage, search } = this.state;
        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
        let { roleId } = this.props.userInfo;
        console.log(this.state.isOpenModalEditUser);
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
                    <FormattedMessage id="system.search">
                        {(placeholder) => (
                            <input
                                type="text"
                                name="search"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                placeholder={placeholder}
                                style={{
                                    padding: '6px 12px',
                                    margin: '0 0 10px 10px',
                                    outline: 'none',
                                    borderRadius: '5px',
                                    border: '1px solid #696969',
                                    width: '230px',
                                }}
                            />
                        )}
                    </FormattedMessage>
                    <TableUsersForDoctor currentUsers={currentUsers} openModalDiagnose={this.openModalDiagnose} search={search} roleId={roleId} />
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

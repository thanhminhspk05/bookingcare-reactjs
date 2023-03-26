import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import ModalEditUser from './ModalEditUser';
import ModalDiagnose from './ModalDiagnose';
import './ManageForAdmin.scss';

class ManageForDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalEditUser: false,
            isOpenModalDiagnose: false,
            dataEditUser: {},
            dataDiagnose: {},
        };
    }

    async componentDidMount() {
        this.getAllUserFromReact();
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

    render() {
        let { userData, dataEditUser, dataDiagnose } = this.state;
        console.log(this.state.dataDiagnose);
        if (userData) {
            userData = userData.filter((item) => item.roleId === 'patient');
        }
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
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th style={{ width: '50px' }}>Number</th>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Adress</th>
                                <th style={{ width: '130px' }}>Details</th>
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

                                            <td>
                                                <button
                                                    onClick={() => {
                                                        this.openModalDiagnose(item);
                                                    }}
                                                >
                                                    Diagnose
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

import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, editUserService } from '../../services/userService';
import './ManageForUser.scss';

class ManageForUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: '',
            password: '',
            birthday: '',
            gender: '',
            healthstatus: '',
        };
    }

    async componentDidMount() {
        let userInfo = this.props.userInfo;
        console.log(userInfo);
        this.setState({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            address: userInfo.address,
            phone: userInfo.phone,
            birthday: userInfo.birthday,
            gender: userInfo.gender,
        });
    }

    handleOnChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // service call api - re-render the component
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                userData: response.user,
            });
        }
    };

    handleEditUser = async () => {
        console.log(this.state);
        try {
            let response = await editUserService(this.state);
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
        console.log(this.state);
        return (
            <div className="container-form">
                <form>
                    <h2 className="title">Update user infomation</h2>
                    <div className="form-outline mb-2">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.email}
                            disabled
                        />
                    </div>
                    <div className="d-flex form-outline mb-2 justify-content-between">
                        <div className="w-40">
                            <label className="form-label">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control form-control-lg"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.firstName}
                                required
                            />
                        </div>
                        <div className="w-40">
                            <label className="form-label">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control form-control-lg"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.lastName}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-outline mb-2">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.address}
                            required
                        />
                    </div>
                    <div className="form-outline mb-2">
                        <label className="form-label">Phone number</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.phone}
                            required
                        />
                    </div>
                    <div className="d-flex form-outline mb-2">
                        <div className="birthday w-50">
                            <label className="form-label">Birthday:</label>
                            <input
                                type="date"
                                name="birthday"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.birthday}
                                required
                            />
                        </div>
                        <div className="gender">
                            <label className="form-label">Gender:</label>
                            <select
                                name="gender"
                                className="mx-2"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.gender}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label">Health status</label>
                        <textarea
                            name="healthstatus"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.healthstatus}
                            rows="6"
                            cols="50"
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body px-3 "
                            onClick={() => {
                                this.handleEditUser();
                            }}
                        >
                            Update
                        </button>
                    </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageForUser);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUserService } from '../../services/userService';
import './Register.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedMessage } from 'react-intl';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: '',
            birthday: '01/01/1950',
            gender: 'male',
            password: '',
            roleId: 'patient',
            errCode: '',
            errMessage: '',
            redirect: 'conform-email',
        };
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'email', 'password', 'address', 'phone', 'birthday'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.warn('Missing required field!');
                break;
            }
        }
        return isValid;
    };

    addNewUser = async () => {
        this.checkValidateInput();

        let response = await createNewUserService(this.state);
        this.setState({
            errCode: response.errCode,
            errMessage: response.errMessage,
        });
        if (response.errCode === 0) {
            window.location.href = 'http://localhost:3000/conform-email';
        }
    };

    render() {
        let { errCode, errMessage } = this.state;
        return (
            <div className="register-background ">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{ maxWidth: '500px' }}>
                                <div className="card">
                                    <div className="card-body p-4">
                                        <h2 className="title">
                                            <FormattedMessage id="register.title" />
                                        </h2>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <FormattedMessage id="register.email" />
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-lg"
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(event);
                                                }}
                                                value={this.state.email}
                                            />
                                            {errCode === 1 || errCode === 2 ? <p style={{ color: 'red', margin: '5px 0px' }}>{errMessage}</p> : ''}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <FormattedMessage id="register.password" />
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control form-control-lg"
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(event);
                                                }}
                                                value={this.state.password}
                                            />
                                            {errCode === 3 ? <p style={{ color: 'red', margin: '5px 0px' }}>{errMessage}</p> : ''}
                                        </div>

                                        <div className="d-flex  mb-3 justify-content-between">
                                            <div style={{ width: '50%' }}>
                                                <label className="form-label">
                                                    <FormattedMessage id="register.first-name" />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control form-control-lg"
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.firstName}
                                                />
                                            </div>
                                            <div style={{ width: '45%' }}>
                                                <label className="form-label">
                                                    <FormattedMessage id="register.last-name" />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control form-control-lg"
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.lastName}
                                                />
                                            </div>
                                        </div>

                                        <div className=" mb-3">
                                            <label className="form-label">
                                                <FormattedMessage id="register.address" />
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control form-control-lg"
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(event);
                                                }}
                                                value={this.state.address}
                                            />
                                        </div>
                                        <div className=" mb-3">
                                            <label className="form-label">
                                                <FormattedMessage id="register.phone" />
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control form-control-lg"
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(event);
                                                }}
                                                value={this.state.phone}
                                            />
                                        </div>
                                        <div className="d-flex  mb-3 justify-content-between">
                                            <div className="birthday w-50">
                                                <label className="form-label">
                                                    <FormattedMessage id="register.birthday" />
                                                </label>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    max={new Date().toISOString().split('T')[0]}
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.birthday}
                                                    className="mx-2"
                                                />
                                            </div>
                                            <div className="gender" style={{ width: '45%' }}>
                                                <label className="form-label">
                                                    <FormattedMessage id="register.gender" />
                                                </label>
                                                <select
                                                    name="gender"
                                                    className="mx-2"
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.gender}
                                                >
                                                    <FormattedMessage id="register.male">
                                                        {(message) => <option value="male">{message}</option>}
                                                    </FormattedMessage>

                                                    <FormattedMessage id="register.female">
                                                        {(message) => <option value="female">{message}</option>}
                                                    </FormattedMessage>
                                                    <FormattedMessage id="register.other">
                                                        {(message) => <option value="other">{message}</option>}
                                                    </FormattedMessage>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-check d-flex  mb-3">
                                            <input className="form-check-input me-2" type="checkbox" value={this.state.agree} />
                                            <label className="form-check-label">
                                                <FormattedMessage id="register.agree" />
                                                <a href="#!">
                                                    <u className="mx-1">
                                                        <FormattedMessage id="register.term" />
                                                    </u>
                                                </a>
                                            </label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body px-3 "
                                                onClick={() => {
                                                    this.addNewUser();
                                                }}
                                            >
                                                <FormattedMessage id="register.register" />
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-4 mb-0">
                                            <FormattedMessage id="register.adready-account" />
                                            <a href="/login">
                                                <u className="mx-1">
                                                    <FormattedMessage id="register.here" />
                                                </u>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUserService } from '../../services/userService';
import './Register.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FormattedMessage } from 'react-intl';

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
        console.log(this.state);
        let { errCode, errMessage } = this.state;
        return (
            <div className="register-background ">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{ maxWidth: '500px' }}>
                                <div className="card">
                                    <div className="card-body p-4">
                                        <h2 className="title">Create an account</h2>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
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
                                            <label className="form-label">Password</label>
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
                                                <label className="form-label">First name</label>
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
                                                <label className="form-label">Last name</label>
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
                                            <label className="form-label">Address</label>
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
                                            <label className="form-label">Phone number</label>
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
                                                <label className="form-label">Birthday:</label>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    max={new Date().toISOString().split('T')[0]}
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.birthday}
                                                />
                                            </div>
                                            <div className="gender" style={{ width: '45%' }}>
                                                <label className="form-label">Gender:</label>
                                                <select
                                                    name="gender"
                                                    className="mx-2"
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.gender}
                                                >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-check d-flex  mb-3">
                                            <input className="form-check-input me-2" type="checkbox" value={this.state.agree} />
                                            <label className="form-check-label">
                                                I agree all statements in{' '}
                                                <a href="#!" className="text-body">
                                                    <u>Terms of service</u>
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
                                                Register
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-4 mb-0">
                                            Have already an account?{' '}
                                            <a href="/login" className="fw-bold text-body">
                                                <u>Login here</u>
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

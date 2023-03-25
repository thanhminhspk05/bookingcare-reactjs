import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUserService } from '../../services/userService';
import './Register.scss';

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
            birthday: '01/01/1901',
            gender: 'male',
            password: '',
            roleId: 'patient',
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
                // alert('Missing required field!');
                break;
            }
        }
        return isValid;
    };

    addNewUser = async () => {
        let isValid = this.checkValidateInput();

        if (isValid) {
            let response = await createNewUserService(this.state);
            console.log(response);
            this.setState({
                errCode: response.errCode,
                errMessage: response.errMessage,
            });
        }
    };

    render() {
        console.log(this.state);
        return (
            <div className="register-background ">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card">
                                    <div className="card-body p-5">
                                        <h2 className="title">Create an account</h2>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-lg"
                                                onChange={(event) => {
                                                    this.handleOnChangeInput(event);
                                                }}
                                                value={this.state.email}
                                                required
                                            />
                                        </div>

                                        <form action="/conform-email">
                                            <div className="d-flex form-outline mb-4 justify-content-between">
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

                                            <div className="form-outline mb-4">
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
                                            <div className="form-outline mb-4">
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
                                            <div className="d-flex form-outline mb-4">
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
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    onChange={(event) => {
                                                        this.handleOnChangeInput(event);
                                                    }}
                                                    value={this.state.password}
                                                    required
                                                />
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" value="" required />
                                                <label className="form-check-label">
                                                    I agree all statements in{' '}
                                                    <a href="#!" className="text-body">
                                                        <u>Terms of service</u>
                                                    </a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
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
                                                <a href="#!" className="fw-bold text-body">
                                                    <u>Login here</u>
                                                </a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

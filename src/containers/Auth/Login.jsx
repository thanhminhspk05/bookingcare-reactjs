import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { handleLoginService } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
    }

    handleOnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleLogin = async () => {
        // this.setState({
        //     errMessage: '',
        // });
        try {
            let response = await handleLoginService(this.state.username, this.state.password);
            if (response && response.errCode !== 0) {
                this.setState({
                    errMessage: response.errMessage,
                });
            }
            if (response && response.errCode === 0) {
                this.props.userLoginSuccess(response.user);
            }
        } catch (e) {
            if (e.response && e.response.response) {
                this.setState({
                    errMessage: e.response.response.message,
                });
            }
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        let { isShowPassword } = this.state;

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-ground login-input">
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Email address or phone number"
                                value={this.state.username}
                                onChange={(e) => {
                                    this.handleOnChangeInput(e);
                                }}
                            />
                        </div>
                        <div className="col-12 form-ground login-input">
                            <div className="custom-input-password">
                                <input
                                    type={isShowPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.handleOnChangeInput(e);
                                    }}
                                />
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword();
                                    }}
                                >
                                    {/* <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i> */}
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <div className="forgot-password">
                                <a href="/">Forgot your password?</a>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <div className="text-other-login">Or login with:</div>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                        <div className="register text-center">
                            <div className="">
                                Haven't account? <a href="/register">Register</a>
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
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            roleId: '',
            errCode: '',
            errMessage: '',
        };
    }

    clearUserInput = () => {
        let emptyState = { email: '', password: '', firstName: '', lastName: '', address: '', errCode: '', errMessage: '', roleId: '' };
        this.setState({
            ...emptyState,
        });
    };

    handleOnChangeInput(event) {
        // bad code setState directly
        // good code
        let copyState = { ...this.state };
        let name = event.target.name;
        copyState[name] = event.target.value;
        this.setState({
            ...copyState,
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    addNewUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            // call api create modal
            let response = await this.props.createNewUser(this.state);
            if (response.errCode === 0) {
                this.clearUserInput();
            }

            this.setState({
                errCode: response.errCode,
                errMessage: response.errMessage,
            });
        }
    };

    render() {
        let { errCode, errMessage } = this.state;
        console.log(errMessage);

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.props.cancelModalCreateUser();
                }}
                className="modal-user-container"
                size="lg" // 3 options: sm , lg , xl
                // centered={true} if modal should be centered vertically in viewport
            >
                <ModalHeader
                    toggle={() => {
                        this.props.cancelModalCreateUser();
                    }}
                >
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.password}
                            />
                            {errCode === 3 ? <p className="warning">{errMessage}</p> : ''}
                        </div>
                        <div className="input-container">
                            <label htmlFor="">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container input-addess">
                            <label htmlFor="">Address</label>
                            <input
                                type="text"
                                name="address"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container gender">
                            <label>Role</label>
                            <select
                                name="roleId"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                style={{ padding: '5px 0' }}
                                value={this.state.gender}
                                required
                            >
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.addNewUser();
                        }}
                    >
                        Add new
                    </Button>
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => {
                            this.props.cancelModalCreateUser();
                        }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);

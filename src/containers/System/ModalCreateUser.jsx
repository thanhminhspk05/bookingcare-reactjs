import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
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
            phone: '',
            gender: '',
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

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.props.cancelModalCreateUser();
                }}
                className="modal-user-container"
                size="lg" // 3 options: sm , lg , xl
            >
                <ModalHeader
                    toggle={() => {
                        this.props.cancelModalCreateUser();
                    }}
                >
                    <FormattedMessage id="system.add" />
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">
                                <FormattedMessage id="system.email" />
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.email}
                            />
                            {errCode === 1 || errCode === 2 ? <p style={{ color: 'red', margin: '5px 0px' }}>{errMessage}</p> : ''}
                        </div>
                        <div className="input-container">
                            <label htmlFor="">
                                <FormattedMessage id="system.password" />
                            </label>
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
                            <label htmlFor="">
                                <FormattedMessage id="system.first-name" />
                            </label>
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
                            <label htmlFor="">
                                <FormattedMessage id="system.last-name" />
                            </label>
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
                            <label htmlFor="">
                                <FormattedMessage id="system.address" />
                            </label>
                            <input
                                type="text"
                                name="address"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container input-addess">
                            <label htmlFor="">
                                <FormattedMessage id="system.phone" />
                            </label>
                            <input
                                type="text"
                                name="phone"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.phone}
                            />
                            {errCode === 4 ? <p className="warning">{errMessage}</p> : ''}
                        </div>

                        <div className="input-container gender">
                            <label>
                                <FormattedMessage id="system.role" />
                            </label>
                            <select
                                name="roleId"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                style={{ padding: '5px 0' }}
                                value={this.state.gender}
                                required
                            >
                                <FormattedMessage id="system.doctor">{(message) => <option value="doctor">{message}</option>}</FormattedMessage>
                                <FormattedMessage id="system.admin">{(message) => <option value="admin">{message}</option>}</FormattedMessage>
                            </select>
                        </div>

                        <div className="input-container gender">
                            <label>
                                <FormattedMessage id="system.gender" />
                            </label>
                            <select
                                name="gender"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                style={{ padding: '5px 0' }}
                                value={this.state.gender}
                                required
                            >
                                <FormattedMessage id="system.male">{(message) => <option value="male">{message}</option>}</FormattedMessage>
                                <FormattedMessage id="system.female">{(message) => <option value="female">{message}</option>}</FormattedMessage>
                                <FormattedMessage id="system.other">{(message) => <option value="other">{message}</option>}</FormattedMessage>
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
                        <FormattedMessage id="system.add-btn" />
                    </Button>
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => {
                            this.props.cancelModalCreateUser();
                        }}
                    >
                        <FormattedMessage id="system.close" />
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

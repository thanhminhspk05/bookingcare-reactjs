import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllUsers, editUserService } from '../../services/userService';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    async componentDidMount() {
        let userId = this.props.dataEditUser.id;
        let data = await getAllUsers(userId);
        this.setState({
            data: data.user,
        });
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                data: response.user,
            });
        }
    };

    clearUserInput = () => {
        let emptyState = { email: '', password: '', firstName: '', lastName: '', address: '' };
        this.setState({
            ...emptyState,
        });
        this.props.response.errCode = '';
        this.props.response.errMessage = '';
    };

    handleOnChangeInput(event) {
        this.setState({
            data: {
                ...this.state.data,
                [event.target.name]: event.target.value,
            },
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.data[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let data = this.state.data;
        let isValid = this.checkValidateInput();

        if (isValid && data) {
            this.props.handleEditUser(data);
            this.props.cancelModalEditUser();
        }
    };

    render() {
        console.log(this.state);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.props.cancelModalEditUser();
                }}
                className="modal-user-container"
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.props.cancelModalEditUser();
                    }}
                >
                    <FormattedMessage id="system.edit" />
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
                                value={this.state.data.email}
                                disabled
                            />
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
                                value="**********"
                                disabled
                            />
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
                                value={this.state.data.firstName}
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
                                value={this.state.data.lastName}
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
                                value={this.state.data.address}
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
                                value={this.state.data.phone}
                            />
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
                                value={this.state.data.roleId}
                                disabled
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
                                value={this.state.data.gender}
                                disabled
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
                            this.handleSaveUser();
                        }}
                    >
                        <FormattedMessage id="system.save-change" />
                    </Button>
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => {
                            this.props.cancelModalEditUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {
        let { dataEditUser } = this.props;
        this.setState({
            id: dataEditUser.id,
            email: dataEditUser.email,
            firstName: dataEditUser.firstName,
            lastName: dataEditUser.lastName,
            address: dataEditUser.address,
        });
    }

    clearUserInput = () => {
        let emptyState = { email: '', password: '', firstName: '', lastName: '', address: '' };
        this.setState({
            ...emptyState,
        });
        this.props.response.errCode = '';
        this.props.response.errMessage = '';
    };

    handleOnChangeInput(event) {
        let copyState = { ...this.state };
        let name = event.target.name;
        copyState[name] = event.target.value;
        this.setState({
            ...copyState,
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(!this.state[arrInput[i]]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let data = {
            id: this.state.id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
        };

        let isValid = this.checkValidateInput();
        console.log(this.props);
        if (isValid && data) {
            this.props.handleEditUser(data);
            this.props.cancelModalEditUser();
        }
    };

    render() {
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
                                value={this.state.email}
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
                                value="hardcore"
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

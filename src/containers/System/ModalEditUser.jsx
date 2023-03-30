import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllUsers } from '../../services/userService';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            birthday: '',
            gender: '',
            roleId: '',
        };
    }

    async componentDidMount() {
        let userId = this.props.dataEditUser.id;
        let data = await getAllUsers(userId);
        data = data.user;
        this.setState({
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phone: data.phone,
            birthday: data.birthday,
            gender: data.gender,
            roleId: data.roleId,
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
        let emptyState = { email: '', firstName: '', lastName: '', address: '', phone: '', birthday: '', gender: '', roleId: '' };
        this.setState({
            ...emptyState,
        });
        this.props.response.errCode = '';
        this.props.response.errMessage = '';
    };

    handleOnChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phone', 'birthday', 'gender', 'roleId'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = async () => {
        let data = this.state;
        let isValid = this.checkValidateInput();
        console.log('is Valid', isValid);

        if (isValid && data) {
            await this.props.handleEditUser(data);
            this.props.cancelModalEditUser();
        }
    };

    render() {
        let { email, firstName, lastName, address, phone, gender, roleId, birthday } = this.state;
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
                                value={email}
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
                                value={phone}
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
                                value={firstName}
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
                                value={lastName}
                            />
                        </div>
                        <div className="input-container address">
                            <label htmlFor="">
                                <FormattedMessage id="system.address" />
                            </label>
                            <input
                                type="text"
                                name="address"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={address}
                            />
                        </div>
                        <div className="input-container birthday">
                            <label>
                                <FormattedMessage id="system.birthday" />
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                max={new Date().toISOString().split('T')[0]}
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={birthday}
                            />
                        </div>

                        <div className="input-container role">
                            <label>
                                <FormattedMessage id="system.role" />
                            </label>
                            <select
                                name="roleId"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                style={{ padding: '5px 0' }}
                                value={roleId}
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
                                value={gender}
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

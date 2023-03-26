import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, editUserService } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ManageForUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: '',
            birthday: '',
            gender: '',
            statusHealth: '',
            diagnose: '',
            prescription: '',
        };
    }

    async componentDidMount() {
        let userInfo = this.props.userInfo;
        userInfo = await getAllUsers(userInfo.id);
        userInfo = userInfo.user;
        this.setState({
            id: userInfo.id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            address: userInfo.address,
            phone: userInfo.phone,
            birthday: userInfo.birthday,
            gender: userInfo.gender,
            statusHealth: userInfo.statusHealth,
            diagnose: userInfo.diagnose,
            prescription: userInfo.prescription,
        });
    }

    handleOnChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleUpdateInfo = async () => {
        try {
            let response = await editUserService(this.state);

            if (response && response.errCode === 0) {
                let newData = await getAllUsers(this.state.id);
                if (newData && newData.errCode === 0) {
                    newData = newData.user;
                    console.log('new', newData);
                    this.setState({
                        id: newData.id,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        email: newData.email,
                        address: newData.address,
                        phone: newData.phone,
                        birthday: newData.birthday,
                        gender: newData.gender,
                        statusHealth: newData.statusHealth,
                        diagnose: newData.diagnose,
                        prescription: newData.prescription,
                    });
                }
            }
            toast.success('Updated information successfully!');
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        console.log(this.state);
        return (
            <div className="container-for" style={{ width: '80%', maxWidth: '550px', margin: '30px auto', border: '1px solid #ccc', padding: '30px' }}>
                <form>
                    <h2 className="title">User infomation</h2>
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

                    <div className="form-outline mb-4">
                        <label className="form-label">Health status</label>
                        <textarea
                            name="statusHealth"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.statusHealth || ''}
                            rows="3"
                            cols="50"
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Diagnose</label>
                        <textarea
                            name="diagnose"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.diagnose || ''}
                            rows="2"
                            cols="50"
                            disabled
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Prescription</label>
                        <textarea
                            name="prescription"
                            className="form-control form-control-lg"
                            onChange={(event) => {
                                this.handleOnChangeInput(event);
                            }}
                            value={this.state.prescription || ''}
                            rows="4"
                            cols="50"
                            disabled
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body px-3 "
                            onClick={() => {
                                this.handleUpdateInfo();
                            }}
                        >
                            Update
                        </button>
                    </div>
                </form>
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageForUser);

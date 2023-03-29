import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class TableUsersForDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayIsFinish: [],
        };
    }

    componentDidMount = () => {
        let array = [];
        for (let i = 0; i < this.props.currentUsers.length; i++) {
            array.push(false);
        }
        this.setState({ arrayIsFinish: array });
    };

    handleChangeFinish = (index) => {
        let array = this.state.arrayIsFinish;
        array[index] = !array[index];
        this.setState({ arrayIsFinish: array });
    };

    render() {
        let currentUsers = this.props.currentUsers;
        let { search, language, roleId } = this.props;
        let { arrayIsFinish } = this.state;

        return (
            <table id="customers">
                <tbody>
                    <tr>
                        <th style={{ width: '100px', textAlign: 'center' }}>
                            <FormattedMessage id="system.number" />
                        </th>
                        <th>
                            <FormattedMessage id="system.email" />
                        </th>
                        <th>
                            <FormattedMessage id="system.first-name" />
                        </th>
                        <th>
                            <FormattedMessage id="system.last-name" />
                        </th>
                        <th>
                            <FormattedMessage id="system.address" />
                        </th>
                        {roleId === 'Admin' && (
                            <th>
                                <FormattedMessage id="system.role" />
                            </th>
                        )}

                        <th>
                            <FormattedMessage id="system.action" />
                        </th>
                    </tr>
                    {currentUsers &&
                        currentUsers
                            .filter((user) => {
                                return search === ''
                                    ? user
                                    : user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                                          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                                          user.address.toLowerCase().includes(search.toLowerCase()) ||
                                          user.roleId.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        {language === 'vi' && (
                                            <td>
                                                {item.roleId === 'Admin' ? 'Quản trị viên' : ''}
                                                {item.roleId === 'Doctor' ? 'Bác sỹ' : ''}
                                                {item.roleId === 'Patient' ? 'Bệnh nhân' : ''}
                                            </td>
                                        )}
                                        {language === 'en' && <td>{item.roleId}</td>}

                                        <td style={{ width: '200px' }}>
                                            <button
                                                onClick={() => {
                                                    this.props.openModalDiagnose(item);
                                                }}
                                                style={{ border: '1px solid #ca8229', margin: '0 10px' }}
                                            >
                                                <FormattedMessage id="system.diagnose" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    this.handleChangeFinish(index);
                                                }}
                                                style={{ border: '1px solid', backgroundColor: 'transparent', color: 'green' }}
                                            >
                                                {arrayIsFinish[index] ? <i class="fas fa-check"></i> : <FormattedMessage id="system.finish" />}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default TableUsersForDoctor;

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class TableUsersForDoctor extends Component {
    render() {
        let currentUsers = this.props.currentUsers;
        let { search, language, roleId } = this.props;

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

                                        <td style={{ width: '150px' }}>
                                            <button
                                                onClick={() => {
                                                    this.props.openModalDiagnose(item);
                                                }}
                                                style={{ border: '1px solid #ca8229' }}
                                            >
                                                <FormattedMessage id="system.diagnose" />
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

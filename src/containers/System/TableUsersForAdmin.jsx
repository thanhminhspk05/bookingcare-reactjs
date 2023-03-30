import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './TableUsers.scss';

class TableUsersForAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    prevPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1,
        });
    };

    nextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
        });
    };

    changeCurrentPage = (number) => {
        this.setState({
            currentPage: number,
        });
    };
    render() {
        let { search, language, userData, usersPerPage } = this.props;
        let { currentPage } = this.state;
        usersPerPage = Number(usersPerPage);
        let indexOfFirstUser = (currentPage - 1) * usersPerPage;
        let indexOfLastUser = indexOfFirstUser + usersPerPage;

        // Filter table
        userData = userData.filter((user) => {
            return search === ''
                ? user
                : user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                      user.email.toLowerCase().includes(search.toLowerCase()) ||
                      user.address.toLowerCase().includes(search.toLowerCase()) ||
                      user.roleId.toLowerCase().includes(search.toLowerCase());
        });
        let totalUsers = userData.length;
        let totalPages = Math.ceil(totalUsers / usersPerPage) + 1;
        let pageNumbers = [];
        indexOfLastUser = indexOfLastUser > totalUsers ? totalUsers : indexOfLastUser;

        for (let i = 1; i < totalPages; i++) {
            pageNumbers.push(i);
        }
        let currentUserPage = userData.slice(indexOfFirstUser, indexOfLastUser);

        // SORT
        let sortCol = 'firstName';
        let ascOrder = true;
        return (
            <>
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

                            <th>
                                <FormattedMessage id="system.role" />
                            </th>
                            <th>
                                <FormattedMessage id="system.action" />
                            </th>
                        </tr>
                        {currentUserPage &&
                            currentUserPage.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: 'center' }}>{item.id}</td>
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
                                                    this.props.openDetailsUser(item);
                                                }}
                                                style={{ border: '1px solid #ca8229' }}
                                            >
                                                <FormattedMessage id="system.detail" />
                                            </button>
                                            <button
                                                className="mx-2"
                                                style={{ border: '1px solid #db0808' }}
                                                onClick={() => this.props.handleDeleteUser(item.id)}
                                            >
                                                <FormattedMessage id="system.delete" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className="pagination-footer">
                    <span>{`Show ${indexOfFirstUser + 1} to ${indexOfLastUser} of ${totalUsers} entries`}</span>
                    <div className="index-buttons">
                        {currentPage === 1 ? (
                            <button
                                onClick={() => {
                                    this.prevPage();
                                }}
                                disabled
                            >
                                <FormattedMessage id="system.previous" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    this.prevPage();
                                }}
                            >
                                <FormattedMessage id="system.previous" />
                            </button>
                        )}

                        {pageNumbers.map((number, index) => (
                            <span key={index} className="mx-1">
                                {currentPage === number ? (
                                    <button className="active">{number}</button>
                                ) : (
                                    <button onClick={() => this.changeCurrentPage(number)}>{number}</button>
                                )}
                            </span>
                        ))}
                        {currentPage === totalPages - 1 ? (
                            <button
                                onClick={() => {
                                    this.nextPage();
                                }}
                                disabled
                            >
                                <FormattedMessage id="system.next" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    this.nextPage();
                                }}
                            >
                                <FormattedMessage id="system.next" />
                            </button>
                        )}
                    </div>
                </div>
            </>
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

export default TableUsersForAdmin;

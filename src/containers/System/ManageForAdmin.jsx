import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./ManageForAdmin.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";
import ModalDetails from "./ModalDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUsers from "./TableUsers";
import Pagination from "./Pagination";
// import Header from '../Header/Header';

class ManageForAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalCreateUser: false,
      isOpenModalEditUser: false,
      isOpenModalDetails: false,
      dataEditUser: {},
      dataDetailsUser: {},
      userData: [],
      currentPage: 1,
      usersPerPage: 10,
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  // RE-RENDER LIST USER
  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        userData: response.user,
      });
    }
  };

  // CREATE USER
  openAddNewUser = () => {
    this.setState({
      isOpenModalCreateUser: true,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode === 0) {
        this.cancelModalCreateUser();
        this.getAllUserFromReact();
        toast.success("Created information successfully!");
        return response;
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  cancelModalCreateUser = () => {
    this.setState({
      isOpenModalCreateUser: false,
    });
  };

  // UPDATE USER
  openEditUser = (data) => {
    this.setState({
      isOpenModalEditUser: true,
      dataEditUser: data,
    });
  };

  cancelModalEditUser = () => {
    this.setState({
      isOpenModalEditUser: false,
    });
  };

  handleEditUser = async (data) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode === 0) {
        this.cancelModalCreateUser();
        this.getAllUserFromReact();
        toast.success("Updated information successfully!");
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE USER
  handleDeleteUser = async (userId) => {
    try {
      let response = await deleteUserService(userId);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        // re-render if deleteUser successfully
        this.getAllUserFromReact();
        toast.success("Deleted information successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // FULL INFOMATION USER
  openDetailsUser = (data) => {
    this.setState({
      isOpenModalDetails: true,
      dataDetailsUser: data,
    });
  };

  cancelDetailsUser = () => {
    this.setState({ isOpenModalDetails: false });
  };

  // CHANGE PAGE
  paginate = (numberPage) => {
    this.setState({
      currentPage: numberPage,
    });
  };

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

  render() {
    let { dataEditUser, dataDetailsUser, userData, currentPage, usersPerPage } =
      this.state;
    let indexOfLastUser = currentPage * usersPerPage;
    let indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <div className="users-container">
        <div className="title text-content">Manage for admin</div>
        <div className="m-3">
          <ModalCreateUser
            isOpen={this.state.isOpenModalCreateUser}
            cancelModalCreateUser={this.cancelModalCreateUser}
            createNewUser={this.createNewUser}
          />

          {this.state.isOpenModalEditUser && (
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser}
              cancelModalEditUser={this.cancelModalEditUser}
              dataEditUser={dataEditUser}
              handleEditUser={this.handleEditUser}
            />
          )}

          <ModalDetails
            isOpen={this.state.isOpenModalDetails}
            cancelDetailsUser={this.cancelDetailsUser}
            dataDetailsUser={dataDetailsUser}
          />

          <button
            className="btn btn-primary px-3"
            onClick={() => {
              this.openAddNewUser();
            }}
          >
            <i className="fas fa-plus"></i>
            <span className="mx-1">Add new user</span>
          </button>
          <button
            className="btn btn-primary px-3 mx-2"
            onClick={() => {
              this.openEditUser(this.props.userInfo);
            }}
          >
            <i className="fas fa-pencil-alt"></i>
            <span className="mx-1">Edit my infomation</span>
          </button>
        </div>
        <div className="user-table mt-3 mx-1">
          <TableUsers
            currentUsers={currentUsers}
            openDetailsUser={this.openDetailsUser}
            handleDeleteUser={this.handleDeleteUser}
          />
          <div className="d-flex justify-content-center">
            {currentPage > 1 ? (
              <button
                style={{
                  padding: "4px 8px",
                  border: "none",
                  margin: "20px 5px",
                  background: "#ccc",
                }}
                onClick={() => {
                  this.prevPage();
                }}
              >
                Previous
              </button>
            ) : (
              <button
                style={{
                  padding: "4px 8px",
                  border: "none",
                  margin: "20px 5px",
                  background: "#ccc",
                }}
                onClick={() => {
                  this.prevPage();
                }}
                disabled
              >
                Previous
              </button>
            )}

            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={userData.length}
              paginate={this.paginate}
            />
            {currentPage < userData.length / usersPerPage ? (
              <button
                style={{
                  padding: "4px 8px",
                  border: "none",
                  margin: "20px 5px",
                  background: "#ccc",
                }}
                onClick={() => {
                  this.nextPage();
                }}
              >
                Next
              </button>
            ) : (
              <button
                style={{
                  padding: "4px 8px",
                  border: "none",
                  margin: "20px 5px",
                  background: "#ccc",
                }}
                onClick={() => {
                  this.nextPage();
                }}
                disabled
              >
                Next
              </button>
            )}
          </div>
        </div>
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

  // Life cycle
  // 1. Run construct => init state
  // 2. Did mount (set state)
  // 3. Render
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageForAdmin);

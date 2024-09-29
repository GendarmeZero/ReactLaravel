import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Navbar/Nav";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [effect, setEffect] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [effect]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
      console.log("Fetched users:", response.data);
      setUsers(response.data);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
      console.error("Error fetching users!", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = editingUser
      ? `http://127.0.0.1:8000/api/users/${editingUser.id}`
      : "http://127.0.0.1:8000/api/users";
    const method = editingUser ? "put" : "post";

    const requestBody = editingUser
      ? { name, email }
      : { name, email, password };

    try {
      const response = await axios({
        method: method,
        url: url,
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      setUsers((prevState) =>
        editingUser
          ? prevState.map((user) =>
              user.id === editingUser.id ? result.user : user
            )
          : [...prevState, result.user]
      );

      Swal.fire({
        title: editingUser ? "Updated!" : "Added!",
        text: `User has been ${
          editingUser ? "updated" : "added"
        } successfully.`,
        icon: "success",
      });
      setEffect(1);
    } catch (error) {
      console.error("Error submitting the form!", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting the user.",
        icon: "error",
      });
    }
  };
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/users/${userId}`)
          .then(() => {
            setUsers((prevState) =>
              prevState.filter((user) => user.id !== userId)
            );
            Swal.fire("Deleted!", "User has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting user!", error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the user.",
              icon: "error",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "User is safe!", "error");
      }
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <Nav />
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    User Management
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="mb-4">
                    <h2 className="main mb-3">
                      {editingUser ? "Edit User" : "Add User"}
                    </h2>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    {/* Only show password field when adding new user */}
                    {!editingUser && (
                      <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    )}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg mx-2"
                      >
                        {editingUser ? "Update User" : "Add User"}
                      </button>
                    </div>
                  </form>

                  <h2 className="main mb-3">All Users</h2>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                          users.map((user) => (
                            <tr key={user?.id}>
                              {" "}
                              {/* Use optional chaining */}
                              <td>{user?.id}</td>
                              <td>{user?.name}</td>
                              <td>{user?.email}</td>
                              <td>{user?.role}</td>
                              <td className="text-center">
                                <button
                                  className="btn_edit"
                                  onClick={() => {
                                    handleEdit(user); // Call your existing edit function
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    }); // Scroll to the top smoothly
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn_delete"
                                  onClick={() => handleDelete(user.id)}
                                >
                                  <MdDelete />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Users;

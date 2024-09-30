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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5); // Default users per page
  const [selectedRole, setSelectedRole] = useState("");
  // const [roles, setRoles] = useState(["Managers", "Supervisor", "Teacher", "user"]); // Add more roles as needed


  useEffect(() => {
    fetchUsers();
  }, [effect]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
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
      case "role":
        setSelectedRole(value);
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
      setEffect((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting the form!", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting the user.",
        icon: "error",
      });
    }
  };

  // const handleEdit = (user) => {
  //   if (user) {
  //     setEditingUser(user);
  //     setName(user.name || ""); // Default to empty string if undefined
  //     setEmail(user.email || ""); // Default to empty string if undefined
  //     setPassword(""); // Reset password for editing
  //   }
  // };

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
      } else {
        Swal.fire("Cancelled", "User is safe!", "error");
      }
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user &&
      user.name && // Check if user and user.name are defined
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole === "" || user.role === selectedRole) // Filter by selected role
  );
  
  const handleEdit = (user) => {
    setEditingUser(user);
    if (user) {
      setEditingUser(user);
      setName(user.name || ""); // Default to empty string if undefined
      setEmail(user.email || ""); // Default to empty string if undefined
      setPassword(""); // Reset password for editing
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Set other state values if necessary
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
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
                  <div className="form-group mb-4 d-flex align-items-center justify-content-between">
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control me-2"
                      style={{ width: "700px" }} // Adjust width as needed
                    />

                    <div className="me-2">
                      <label htmlFor="usersPerPage" className="form-label mb-0">
                        Users per page:
                      </label>
                      <select
                        id="usersPerPage"
                        value={usersPerPage}
                        onChange={(e) =>
                          setUsersPerPage(Number(e.target.value))
                        }
                        className="form-select"
                        style={{ width: "120px", marginBottom: "14px" }} // Adjust width as needed
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="role" className="form-label mb-0">
                        Role:
                      </label>
                      <select
                        name="role"
                        value={selectedRole}
                        onChange={handleInputChange}
                        className="form-select"
                        style={{ width: "150px", marginBottom: "14px" }} // Adjust width as needed
                      >
                        <option value="Managers">Managers</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Teacher">Teacher</option>
                        <option value="user">User</option>
                        <option value="">All Roles</option>
                        {/* Add more roles as needed */}
                      </select>
                    </div>
                  </div>

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
                      {currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>

                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => handleEdit(user)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => handleDelete(user.id)}
                            >
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div className="text-center">No users found.</div>
                  )}
                </div>

                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`btn ${
                        currentPage === index + 1
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      // </div>
    );
  }
};

export default Users;

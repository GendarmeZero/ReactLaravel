import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Navbar/Nav";
import { useAuth } from "../AuthContext/AuthContext";

const Contacts = ({ userRole }) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5); // Default contacts per page

  useEffect(() => {
    fetchContacts();
  }, [userRole]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contacts");
      setContacts(response.data);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
      console.error("Error fetching contacts!", error);
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
      case "subject":
        setSubject(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = editingContact
      ? `http://127.0.0.1:8000/api/contacts/${editingContact.id}`
      : "http://127.0.0.1:8000/api/contacts";
    const method = editingContact ? "put" : "post";

    const requestBody = { name, email, subject, message };

    try {
      const response = await axios({
        method,
        url,
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      setContacts((prevState) =>
        editingContact
          ? prevState.map((contact) =>
              contact.id === editingContact.id ? result.contact : contact
            )
          : [...prevState, result.contact]
      );

      Swal.fire({
        title: editingContact ? "Updated!" : "Added!",
        text: `Contact has been ${
          editingContact ? "updated" : "added"
        } successfully.`,
        icon: "success",
      });

      resetForm();
    } catch (error) {
      console.error("Error submitting the form!", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting the contact.",
        icon: "error",
      });
    }
  };

  const resetForm = () => {
    setEditingContact(null);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setEmail(contact.email);
    setSubject(contact.subject);
    setMessage(contact.message);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (contactId) => {
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
          .delete(`http://127.0.0.1:8000/api/contacts/${contactId}`)
          .then(() => {
            setContacts((prevState) =>
              prevState.filter((contact) => contact.id !== contactId)
            );
            Swal.fire("Deleted!", "Contact has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting contact!", error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the contact.",
              icon: "error",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Contact is safe!", "error");
      }
    });
  };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    Contact Management
                  </h6>
                </div>
                <div className="card-body">
                  <h2 className="main mb-3">All Contacts</h2>

                  {/* Search Bar */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Search Bar */}
                    <input
                      type="text"
                      className="form-control me-3" // 'me-3' adds margin between the input and dropdown
                      placeholder="Search by name or email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "700px" }} // Adjust width as needed
                    />

                    {/* Users per page dropdown */}
                    <div className="me-2">
                    <label   className="form-label mb-0"
                          style={{ marginBottom: "14px" }}
                          htmlFor="contactsPerPage"
                        >
                          Users per page:
                        </label>
                        <select
                          id="contactsPerPage"
                          value={contactsPerPage}
                          onChange={(e) =>
                            setContactsPerPage(Number(e.target.value))
                          }
                          className="form-select"
                          style={{ width: "100px", marginBottom: "14px" }} // Adjust width as needed
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={15}>15</option>
                          <option value={20}>20</option>
                        </select>
                      </div>
                    </div>
                  </div>

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
                          <th>Subject</th>
                          <th>Message</th>
                          {user.role === "Managers" && <th>Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {currentContacts.length > 0 ? (
                          currentContacts.map((contact) => (
                            <tr key={contact?.id}>
                              <td>{contact?.id}</td>
                              <td>{contact?.name}</td>
                              <td>{contact?.email}</td>
                              <td>{contact?.subject}</td>
                              <td>{contact?.message}</td>
                              {user.role === "Managers" && (
                                <td className="text-center">
                                  <button
                                    className="btn_delete"
                                    onClick={() => handleDelete(contact.id)}
                                  >
                                    <MdDelete />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={userRole === "Managers" ? 6 : 5}>
                              No contacts found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <nav>
                      <ul className="pagination justify-content-end">
                        {Array.from(
                          {
                            length: Math.ceil(
                              contacts.length / contactsPerPage
                            ),
                          },
                          (_, i) => (
                            <li
                              key={i}
                              className={`page-item ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                onClick={() => paginate(i + 1)}
                                className="page-link"
                              >
                                {i + 1}
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            <Footer />    
            </div>
          </div>
        </div>
     );
  }
};

export default Contacts;

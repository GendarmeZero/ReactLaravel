import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Navbar/Nav";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

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
        text: `Contact has been ${editingContact ? "updated" : "added"} successfully.`,
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
                    Contact Management
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="mb-4">
                    <h2 className="main mb-3">
                      {editingContact ? "Edit Contact" : "Add Contact"}
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
                    <div className="form-group">
                      <label htmlFor="subject">Subject:</label>
                      <input
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message:</label>
                      <textarea
                        name="message"
                        value={message}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg mx-2">
                        {editingContact ? "Update Contact" : "Add Contact"}
                      </button>
                    </div>
                  </form>

                  <h2 className="main mb-3">All Contacts</h2>
                  <div className="table-responsive">
                    <table className="table table-bordered" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(contacts) && contacts.length > 0 ? (
                          contacts.map((contact) => (
                            <tr key={contact?.id}>
                              <td>{contact?.id}</td>
                              <td>{contact?.name}</td>
                              <td>{contact?.email}</td>
                              <td>{contact?.subject}</td>
                              <td>{contact?.message}</td>
                              <td className="text-center">
                                <button
                                  className="btn_edit"
                                  onClick={() => handleEdit(contact)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn_delete"
                                  onClick={() => handleDelete(contact.id)}
                                >
                                  <MdDelete />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No contacts found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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

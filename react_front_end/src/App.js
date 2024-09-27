import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersTable from "./components/Users/Users.js"; // This is your table component
import Contacts from "./components/Contact/Contact.js";
import Dashboard from "./components/Chart/Chart.js";
function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <div id="wrapper">
        {/* <Sidebar /> */}
        <div id="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/contacts" element={<Contacts />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


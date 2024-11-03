
import './App.css';
import Login from './components/login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import Logout from './components/logout';
import NotFound from './components/notfound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/home';
import RequestListe from './components/request-liste';
import CreateRequest from './components/createRequest';
import UpdateRequest from './components/updateRequest';
import AllRequests from './components/all-requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllUsers from './components/all-users';
import Notification from './components/notifications';
const clientId = "27111715816-0c4sv24r2uublsg9m5irehg31jme95dm.apps.googleusercontent.com"




function App() {


  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requests" element={<RequestListe />} />
            <Route path="/requests/create" element={<CreateRequest />} />
            <Route path="/all/requests" element={<AllRequests />} />
            <Route path="/requests/:id" element={<UpdateRequest />} />
            <Route path="/all/notifications" element={<Notification />} />
            <Route path="/all/users" element={<AllUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin></script>

      <script>var Alert = ReactBootstrap.Alert;</script>
    </div>
  );
}

export default App;

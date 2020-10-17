import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../src/Database/FirebaseConfig";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';

//components
import Register from './Components/Register';
import icon from './Images/icon.png';
import Home from  './Components/Home';
import Login from './Components/Login';
import SuppliersPage from './Components/Suppliers';
import UpdateSuppliers from './Components/UpdateSuppliers';
import AddSuppliers from './Components/AddSuppliers';
import AddProducts from './Components/AddProducts';
import ProductsPage from './Components/Products';
import AddManager from './Components/Manager';
import UpdateProduct from './Components/UpdateProduct';
import OrdersPage from './Components/Orders';





import LoginState from './Config/LoginState';


class App extends React.Component{



  render()
  {
    return (
        <Router>
          <Route
              path="/"
              render={() => {
                return (
                    <Navbar expand="lg" sticky="top" className="navbar-color navbarcolor">
                      <Navbar.Brand href="/">
                        <img src={icon} className="logo" />
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {!LoginState.isLoggedIn() && (
                                <Nav.Link href="/" className="header-link">
                                    {/*<FontAwesomeIcon icon={faHome} className="mr-1" />*/}
                                    <strong className="navLinkColor">Home</strong>
                                </Nav.Link>
                            )}
                            {LoginState.isLoggedIn() && (
                                <Nav.Link href="/orders" className="header-link">
                                    {/*<FontAwesomeIcon icon={faHome} className="mr-1" />*/}
                                    <strong className="navLinkColor">Home</strong>
                                </Nav.Link>
                            )}
                          { !LoginState.isLoggedIn() && (
                              <Nav.Link href="/login" className="header-link">
                                {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                <strong className="navLinkColor">Login</strong>
                              </Nav.Link>
                          )}
                            { LoginState.isLoggedIn() && (
                                <Nav.Link className="header-link" href="/suppliers">
                                    {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                    <strong className="navLinkColor">Suppliers</strong>
                                </Nav.Link>
                            )}
                            { LoginState.isLoggedIn() && (
                                <Nav.Link className="header-link" href="/products">
                                    {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                    <strong className="navLinkColor">Products</strong>
                                </Nav.Link>
                            )}
                            { LoginState.isLoggedIn() && (
                                <Nav.Link className="header-link" href="/manager/add">
                                    {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                    <strong className="navLinkColor">Manager</strong>
                                </Nav.Link>
                            )}
                            { LoginState.isLoggedIn() && (
                                <Nav.Link className="header-link">
                                    {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                    <strong className="navLinkColor" onClick={this.logout}>Logout?</strong>
                                </Nav.Link>
                            )}
                            {!LoginState.isLoggedIn() && (
                                <Nav.Link href="/register" className="header-link">
                                    {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                    <strong className="navLinkColor">Register</strong>
                                </Nav.Link>
                            )}
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>
                );
              }}
          />

          <Route path={'/'} exact strict component={Home} />
          <Route path={'/supplier/:id'} exact strict component={UpdateSuppliers} />
            <Route path={'/product/:id'} exact strict component={UpdateProduct} />
            <Route path={'/suppliers/add'} exact strict component={AddSuppliers} />
            <Route path={'/products/add'} exact strict component={AddProducts} />
            <Route path={'/products'} exact strict component={ProductsPage} />
          <Route path={'/login'} exact strict component={Login} />
          <Route path={'/register'} exact strict component={Register} />
          <Route path={'/orders'} exact strict component={OrdersPage} />
          <Route path={'/suppliers'} exact strict component={SuppliersPage} />
            <Route path={'/manager/add'} exact strict component={AddManager} />
        </Router>
    );
  }
  logout = () => {
      LoginState.Logout();
      window.location.href = '/';
  };

}

export default App;

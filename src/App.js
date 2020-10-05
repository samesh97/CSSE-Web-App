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
import OrdersPage from './Components/Orders';
import SuppliersPage from './Components/Suppliers';


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
                    <Navbar expand="lg" sticky="top" className="navbar-color p-3 navbarcolor">
                      <Navbar.Brand href="/">
                        <img src={icon} className="logo" />
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                          <Nav.Link href="/" className="header-link">
                            {/*<FontAwesomeIcon icon={faHome} className="mr-1" />*/}
                            <strong className="navLinkColor">Home</strong>
                          </Nav.Link>
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
                                <Nav.Link className="header-link" href="">
                                    {/*<FontAwesomeIcon icon={faAddressBook} className="icon mr-1" />*/}
                                    <strong className="navLinkColor">Products</strong>
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
          {/*<Route path={'/product/:pid'} exact strict component={ProductDetailsView} />*/}
          <Route path={'/login'} exact strict component={Login} />
          <Route path={'/register'} exact strict component={Register} />
          <Route path={'/orders'} exact strict component={OrdersPage} />
          <Route path={'/suppliers'} exact strict component={SuppliersPage} />
          {/*<Route path={'/wishList'} exact strict component={WishList} />*/}
          {/*<Route path={'/cart'} exact strict component={Cart} />*/}
          {/*<Route path={'/categories'} exact strict component={AdminCategoryView} />*/}
          {/*<Route path={'/products'} exact strict component={ManagerView} />*/}
          {/*<Route path={'/products/create'} exact strict component={ProductCreateAndUpdate} />*/}
          {/*<Route path={'/products/update/:pid'} exact strict component={ProductCreateAndUpdate} />*/}
          {/*<Route path={'/error'} exact strict component={Error} />*/}
          {/*<Route path={'/productByCategory/:cid'} exact strict component={Category} />*/}
          {/*<Route path={'/register/manager'} exact strict component={RegisterManager} />*/}
        </Router>
    );
  }
  logout = () => {
      LoginState.Logout();
      window.location.href = '/';
  };

}

export default App;

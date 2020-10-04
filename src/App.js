import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../src/Database/FirebaseConfig";
import Navbar from "react-bootstrap";
import './Css/App.css';

class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      companyName : '',
      companyEmail : '',
      companyPhone : '',
      companyAddress : '',
      companyPassword : '',
      companyRetypedPassword : ''
    };
  }

  render()
  {
    return (
        <div className="App">
          <div  className="w-100">
            <form className="w-25" id="container">

              <div className="form-group">
                <input type="text"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Company Name"
                       onChange={ (e) => this.setState({companyName : e.target.value})}/>
              </div>
              <div className="form-group">
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Company Email"
                       onChange={ (e) => this.setState({companyEmail : e.target.value})}/>
              </div>
              <div className="form-group">
                <input type="phone"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Company Phone"
                       onChange={ (e) => this.setState({companyPhone : e.target.value})}/>
              </div>
              <div className="form-group">
                <input type="text"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Company Address"
                       onChange={ (e) => this.setState({companyAddress : e.target.value})}/>
              </div>
              <div className="form-group">
                <input type="password"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Password"
                       onChange={ (e) => this.setState({companyPassword : e.target.value})}/>
              </div>
              <div className="form-group">
                <input type="password"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Re-type Password"
                       onChange={ (e) => this.setState({companyRetypedPassword : e.target.value})}/>
              </div>

              <button type="submit" className="btn btn-primary w-100" onClick={this.register}>Register</button>

            </form>
          </div>
        </div>
    );
  }
  callMe = () =>{
    const ref = firebase.database().ref("Hello");
    ref.set()

  }
  clearInputFields = () => {
    this.setState({
      companyName : '',
      companyEmail : '',
      companyPhone : '',
      companyAddress : '',
      companyPassword : '',
      companyRetypedPassword : ''
    });
  }
  register = (e) => {

    e.preventDefault();
    if(this.state.companyName === "")
    {
      alert("Please enter company name");
      return;
    }
    if(this.state.companyEmail === "")
    {
      alert("Please enter company email");
      return;
    }
    if(this.state.companyPhone === "")
    {
      alert("Please enter company phone");
      return;
    }
    if(this.state.companyAddress === "")
    {
      alert("Please enter company address");
      return;
    }
    if(this.state.companyPassword === "")
    {
      alert("Please enter company password");
      return;
    }
    if(this.state.companyRetypedPassword === "")
    {
      alert("Please enter company password again");
      return;
    }
    if(this.state.companyPassword !== this.state.companyRetypedPassword)
    {
      alert("Password mismatched");
      return;
    }

    const ref = firebase.database().ref("Companies");
    let company = {
      companyName : this.state.companyName,
      companyEmail : this.state.companyEmail,
      companyAddress : this.state.companyAddress,
      companyPassword: this.state.companyPassword,
      companyPhone: this.state.companyPhone
    };

    ref.push(company);
    alert("Success");

    this.clearInputFields();
  }

}

export default App;

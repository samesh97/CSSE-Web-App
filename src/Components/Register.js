import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../Database/FirebaseConfig";
import Navbar from "react-bootstrap";
import '../Css/App.css';

import register_image from '../Images/hello.png';

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
                    <form className="w-50" id="register_root">

                           <img src={register_image} className="register_image"/>


                        <div  id="container">
                            <div className="form-group">
                                <input type="text"
                                       className="form-control inputfirstlogin"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder="Company Name"
                                       value={this.state.companyName}
                                       onChange={ (e) => this.setState({companyName : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <input type="email"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       value={this.state.companyEmail}
                                       aria-describedby="emailHelp"
                                       placeholder="Company Email"
                                       onChange={ (e) => this.setState({companyEmail : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <input type="phone"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder="Company Phone"
                                       value={this.state.companyPhone}
                                       onChange={ (e) => this.setState({companyPhone : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder="Company Address"
                                       value={this.state.companyAddress}
                                       onChange={ (e) => this.setState({companyAddress : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder="Password"
                                       value={this.state.companyPassword}
                                       onChange={ (e) => this.setState({companyPassword : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder="Re-type Password"
                                       value={this.state.companyRetypedPassword}
                                       onChange={ (e) => this.setState({companyRetypedPassword : e.target.value})}/>
                            </div>

                            <div className="register_btn_container">
                                <button type="submit" className="btn btn-primary registerbtn" onClick={this.register}>Register</button>
                            </div>


                        </div>



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

        let d = new Date();
        let time = d.getMilliseconds();
        let random = Math.floor(Math.random() * 10000000);

        let key = time * random;

        const ref = firebase.database().ref("Companies").child(key);
        let company = {
            companyId : key,
            companyName : this.state.companyName,
            companyEmail : this.state.companyEmail,
            companyAddress : this.state.companyAddress,
            companyPassword: this.state.companyPassword,
            companyPhone: this.state.companyPhone
        };




        ref.set(company, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                alert("Registration Success");
                window.location.href = '/login';
            }
        })


    }

}

export default App;
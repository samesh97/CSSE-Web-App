import React from "react";
import register_image from "../Images/hello.png";
import firebase from "../Database/FirebaseConfig";

import LoginState from '../Config/LoginState';

class App extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
            managerName : '',
            email : '',
            password : '',
            retypedPassword : ''
        };
    }

    render() {
        return(
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
                                           placeholder="Manager Name"
                                           value={this.state.managerName}
                                           onChange={ (e) => this.setState({managerName : e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           value={this.state.email}
                                           aria-describedby="emailHelp"
                                           placeholder="Email"
                                           onChange={ (e) => this.setState({email : e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           placeholder="Password"
                                           value={this.state.password}
                                           onChange={ (e) => this.setState({password : e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           placeholder="Re-type Password"
                                           value={this.state.retypedPassword}
                                           onChange={ (e) => this.setState({retypedPassword : e.target.value})}/>
                                </div>

                                <div className="register_btn_container">
                                    <button type="submit" className="btn btn-primary registerbtn" onClick={(e) => this.registerManager(e)}>Register Manager</button>
                                </div>


                            </div>



                        </form>
                    </div>
                </div>
        )
    }

    registerManager = (e) =>{
        e.preventDefault();

        if(this.state.managerName === "")
        {
            alert("Please enter Manager name");
            return;
        }
        if(this.state.email === "")
        {
            alert("Please enter email");
            return;
        }
        if(this.state.password === "")
        {
            alert("Please enter a password");
            return;
        }
        if(this.state.retypedPassword === "")
        {
            alert("Please enter the password again");
            return;
        }
        if(this.state.password !== this.state.retypedPassword)
        {
            alert("Password mismatched");
            return;
        }

        let d = new Date();
        let time = d.getMilliseconds();
        let random = Math.floor(Math.random() * 10000000);
        let key = time * random;

        const ref = firebase.database().ref("Managers").child(key);
        let company = {
            companyId : LoginState.getCompanyId(),
            managerId : key,
            managerName : this.state.managerName,
            email : this.state.email,
            password: this.state.password,
        };

        ref.set(company, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                alert("Manager was successfully Registered!");
                window.location.href = '/manager/add';
            }
        })

    }
}
export default App;
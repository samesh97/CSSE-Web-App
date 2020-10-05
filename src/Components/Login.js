import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../Database/FirebaseConfig";
import Navbar from "react-bootstrap";
import '../Css/App.css';

import register_image from '../Images/hello.png';
import LoginState from '../Config/LoginState';

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            companyEmail : '',
            companyPassword : ''
        };
    }

    render()
    {
        return (
            <div className="App">
                <div  className="w-100">
                    <form className="w-50" id="login_root">

                           <img src={register_image} className="register_image"/>


                        <div  id="container">
                            <div className="form-group">
                                <input type="email"
                                       className="form-control inputfirstlogin"
                                       id="exampleInputEmail1"
                                       value={this.state.companyEmail}
                                       aria-describedby="emailHelp"
                                       placeholder="Company Email"
                                       onChange={ (e) => this.setState({companyEmail : e.target.value})}/>
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

                            <div className="register_btn_container">
                                <button type="submit" className="btn btn-primary loginbtn" onClick={this.login}>Login</button>
                            </div>


                        </div>



                    </form>
                </div>
            </div>
        );
    }

    clearInputFields = () => {
        this.setState({
            companyEmail : '',
            companyPassword : ''
        });
    }
    login = (e) => {

        e.preventDefault();
        if(this.state.companyEmail === "")
        {
            alert("Please enter company email");
            return;
        }

        if(this.state.companyPassword === "")
        {
            alert("Please enter company password");
            return;
        }

        const ref = firebase.database().ref("Companies");
        ref.once('value',(snapshot) => {

            const companyObjectList = snapshot.val();
            var newList = [];

            for(let id in companyObjectList)
            {
                let email = companyObjectList[id].companyEmail;
                let pw = companyObjectList[id].companyPassword;
                let companyId = companyObjectList[id].companyId;

                newList.push(email);
                if(this.state.companyEmail === email && this.state.companyPassword === pw)
                {
                    LoginState.setUserLoggedIn(companyId,email);
                    alert("Login success");
                    window.location.href = '/orders';
                    break;
                }
                if(newList.length === snapshot.numChildren())
                {
                    alert("Login failed");
                }
            }


        });
    }

}

export default App;
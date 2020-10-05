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
                                <button type="submit" className="btn btn-primary loginbtn" onClick={this.login}>LOGIN</button>
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
    }

}

export default App;
import React from "react";

import css from '../Css/App.css';
import register_image from "../Images/hello.png";

import firebase from "../Database/FirebaseConfig";
import LoginState from '../Config/LoginState';

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state ={
            companyName : '',
            companyEmail : '',
            companyPhone : '',
            companyAddress : '',
            companyManagerName : '',
            companyType : '',
            isLoading : true
        };
    }

    componentDidMount()
    {
       const supplierId = this.props.match.params.id;
       this.getSupplier(supplierId);
    }


    render() {
        return(
            <div className="App">
                <div  className="w-100">
                    {this.state.isLoading && (
                        <div className="loading_screen">
                            <div className="loader"/>
                        </div>
                    )}
                    {!this.state.isLoading && (
                        <form className="w-50" id="register_root">

                            <img src={register_image} className="register_image"/>


                            <div  id="container">
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control inputfirstlogin"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           value={this.state.companyName}
                                           onChange={(e) => {this.setState({companyName : e.target.value})}}
                                           placeholder="Company Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           value={this.state.companyEmail}
                                           onChange={(e) => {this.setState({companyEmail : e.target.value})}}
                                           placeholder="Company Email"/>
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           value={this.state.companyAddress}
                                           onChange={(e) => {this.setState({companyAddress : e.target.value})}}
                                           placeholder="Company Address"/>
                                </div>
                                <div className="form-group">
                                    <input type="phone"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           value={this.state.companyPhone}
                                           onChange={(e) => {this.setState({companyPhone : e.target.value})}}
                                           placeholder="Contact Number"/>
                                </div>

                                <div className="form-group">
                                    <input type="text"
                                           className="form-control input"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           value={this.state.companyManagerName}
                                           onChange={(e) => {this.setState({companyManagerName : e.target.value})}}
                                           placeholder="Manager Name"/>
                                </div>

                                <div className="form-group">
                                    <select name="type" id="type" value={this.state.companyType} className="form-control input" onChange={(e) => this.OnTypeSelected(e.target.value)}>
                                        <option value="">Type</option>
                                        <option value="Hardware">Hardware</option>
                                        <option value="Paint Material">Paint Material</option>
                                        <option value="Sand">Sand</option>
                                        <option value="Cement">Cement</option>
                                    </select>
                                </div>


                                <div className="register_btn_container">
                                    <button type="submit" className="btn btn-primary registerbtn" onClick={(e) => this.updateSupplier(e)}>Update Supplier</button>
                                </div>


                            </div>



                        </form>
                    )}

                </div>
            </div>
        )
    }
    OnTypeSelected = (value) => {

        this.setState({
            companyType : value
        });
    }
    updateSupplier = (e) => {

        e.preventDefault();
        if(this.state.companyName === "")
        {
            alert("Please enter company name");
            return
        }
        if(this.state.companyEmail === "")
        {
            alert("Please enter company email");
            return
        }
        if(this.state.companyAddress === "")
        {
            alert("Please enter company address");
            return
        }
        if(this.state.companyPhone === "")
        {
            alert("Please enter company phone number");
            return
        }
        if(this.state.companyManagerName === "")
        {
            alert("Please enter company manager name");
            return
        }
        if(this.state.companyType === "")
        {
            alert("Please enter company type");
            return
        }


        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers").child(this.props.match.params.id);

        let supplier = {
            supplierId : this.props.match.params.id,
            companyId : LoginState.getCompanyId(),
            supplierName : this.state.companyName,
            supplierEmail : this.state.companyEmail,
            supplierAddress : this.state.companyAddress,
            supplierPhone: this.state.companyPhone,
            supplierManagerName : this.state.companyManagerName,
            supplierType : this.state.companyType

        };

        ref.set(supplier, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                alert("Supplier was successfully Updated!");
                window.location.href = '/suppliers';
            }
        })

    };

    getSupplier(supplierId)
    {
        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers").child(supplierId);
        ref.once('value',(snapshot) => {

            const item = snapshot.val();

            this.setState({
                companyName : item.supplierName,
                companyEmail : item.supplierEmail,
                companyPhone : item.supplierPhone,
                companyAddress : item.supplierAddress,
                companyManagerName : item.supplierManagerName,
                companyType : item.supplierType,
                isLoading : false
            });
        });
    }
}
export default App;
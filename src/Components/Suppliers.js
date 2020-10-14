import React from "react";

import css from '../Css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../Database/FirebaseConfig";
import LoginState from "../Config/LoginState";



class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            mySupplierList : [],
            allSuppliers : [],
            isLoading : true
        };


    }

    componentDidMount() {
        this.getMySupplierList();
    }
    render() {


        const listItems = this.state.mySupplierList.map(item => {

            return (


                <div className="container card_container">
                    <div className="row">
                        <div className="col">
                            <img className="supplierImage" src={item.supplierImage}/>
                        </div>
                        <div className="col card_body">
                            <div className="card-body">

                                <h5 className="card-title">{item.supplierName}</h5>
                                <p className="card-text">{"Email -" + item.supplierEmail}</p>
                                <p className="card-text order_p_below">{"Contact No - " + item.supplierPhone}</p>
                                <p className="card-text order_p_below">{"Address - " + item.supplierAddress}</p>
                                <p className="card-text order_p_below">{"Type - " + item.supplierType}</p>
                                <a className="btn btn-danger order_edit_update_btn" onClick={() => this.removeItem(item.supplierId)}>Remove</a>

                            </div>
                        </div>
                    </div>
                </div>





            )
        })


        const allSuppliers = this.state.allSuppliers.map(item => {

            return (


                <div className="container card_container">
                    <div className="row">
                        <div className="col">
                            <img className="supplierImage" src={item.supplierImage}/>
                        </div>
                        <div className="col card_body">
                            <div className="card-body">

                                <h5 className="card-title">{item.supplierName}</h5>
                                <p className="card-text">{"Email -" + item.supplierEmail}</p>
                                <p className="card-text order_p_below">{"Contact No - " + item.supplierPhone}</p>
                                <p className="card-text order_p_below">{"Address - " + item.supplierAddress}</p>
                                <p className="card-text order_p_below">{"Type - " + item.supplierType}</p>
                                <a className="btn btn-primary order_edit_update_btn" onClick={() => this.Add(item)}>Add</a>

                            </div>
                        </div>
                    </div>
                </div>





            )
        })


        return(
            <div>

                    {this.state.isLoading && (
                        <div className="loading_screen">
                            <div className="loader"/>
                        </div>
                    )}

                {
                    !this.state.isLoading &&  <div className="orders_container">{listItems}</div>
                }
                {
                    !this.state.isLoading && this.state.mySupplierList.length > 0 && <div className="orders_contai">{allSuppliers}</div>
                }
                {
                    !this.state.isLoading && this.state.mySupplierList.length === 0 && <div className="orders_container">{allSuppliers}</div>
                }



            </div>


        );
    }

    getMySupplierList = () =>{

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers");
        let newList = [];

        ref.once('value',(snapshot) => {

            const list = snapshot.val();

            for(let i in list)
            {
                newList.push(list[i]);

            }
            this.setState({
                mySupplierList : newList,
            });
            this.getAllSuppliers(this.state.mySupplierList);

        })
    }
    Add = (supplier) => {



        const newSupplier = {
            supplierId : supplier.supplierId,
            supplierName : supplier.supplierName,
            supplierEmail : supplier.supplierEmail,
            supplierAddress : supplier.supplierAddress,
            supplierPhone : supplier.supplierPhone,
            supplierType : supplier.supplierType,
            supplierImage : supplier.supplierImage
        }

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers").child(newSupplier.supplierId);

        ref.set(newSupplier, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                alert("Supplier was successfully Added!");
                window.location.href = '/suppliers';
            }
        })
    }

    removeItem = (supplierId) => {
        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers").child(supplierId);
        ref.remove()
            .then(function()
            {
                alert("Removed Successfully!");
                window.location.href = "/suppliers";
            })
            .catch(function(error)
            {
                alert("An error occurred!");
            });
    }
    getAllSuppliers = (filterList) => {

        const ref = firebase.database().ref("Suppliers");
        let newList = [];
        ref.once('value',(snapshot) => {

            const list = snapshot.val();
            for(let i in list)
            {
                let bool = false;
                for(let x in filterList)
                {
                    const item = list[i];
                    const filterItem = filterList[x];

                    if(item.supplierId === filterItem.supplierId)
                    {
                        bool = true;
                    }

                }
                if(!bool)
                {
                    newList.push(list[i]);
                }

            }
            this.setState({
                allSuppliers : newList,
                isLoading : false
            });

        })

    };



}
export default App;
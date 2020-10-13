import React from "react";

import css from '../Css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../Database/FirebaseConfig";
import LoginState from "../Config/LoginState";



import LoadingOverlay from 'react-loading-overlay';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
          ordersList : [],
            isLoading : true
        };


    }

    componentDidMount() {
        this.getSupplierList();
    }
    render() {

        const listItems = this.state.ordersList.map(item => {



            return (
                <div className="w-100">


                    <div className="card card_body">
                        <div className="card-body">
                            <h5 className="card-title">{item.supplierName}</h5>
                            <p className="card-text">{"Email -" + item.supplierEmail}</p>
                            <p className="card-text order_p_below">{"Contact No - " + item.supplierPhone}</p>
                            <p className="card-text order_p_below">{"Manager Name - " + item.supplierManagerName}</p>
                            <p className="card-text order_p_below">{"Type - " + item.supplierType}</p>
                            <a className="btn btn-primary order_edit_update_btn" onClick={() => this.updateItem(item.supplierId)}>Edit</a>
                            <a className="btn btn-danger ml-2 order_edit_update_btn" onClick={() => this.deleteItem(item.supplierId)}>Delete</a>
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

                {!this.state.isLoading &&   <a className="btn btn-primary add_suppliers_btn" onClick={() => this.GoToAddSupplier()}>Add Suppliers</a>
                }

                {!this.state.isLoading &&  <div className="orders_container" id="capture">{listItems}</div>
                }



            </div>


        );
    }

    getSupplierList = () =>{

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers");

        let list = [];
        list.push("hello");
        // this.setState({
        //             ordersList : list
        //         });

        ref.once('value',(snapshot) => {

            const list = snapshot.val();
            let newList = [];
            for(let i in list)
            {
                newList.push(list[i]);
                this.setState({
                    ordersList : newList,
                    isLoading : false
                });

            }
            if(snapshot.numChildren() === 0)
            {
                this.setState({
                    isLoading : false
                })
            }

        })
    }

    deleteItem = (supplierId) => {
        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers").child(supplierId);
        ref.remove()
            .then(function()
            {
                alert("Deleted successfully!");
                window.location.href = "/suppliers";
            })
            .catch(function(error)
            {
                alert("An error occurred!");
            });
    }

    updateItem = (supplierId) =>
    {
       window.location.href = "/supplier/" + supplierId;
    }

    GoToAddSupplier() {

        window.location.href = " /suppliers/add";

    }


}
export default App;
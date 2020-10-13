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
            productsList : [],
            isLoading : true
        };


    }
    componentDidMount() {
        this.getProductsList();
    }

    render() {




        const listItems = this.state.productsList.map(item => {

            return (


                <div className="container card_container">
                    <div className="row">
                        <div className="col">
                            <img className="productImage" src={item.imageLink}/>
                        </div>
                        <div className="col card_body">
                            <div className="card-body">
                                <h5 className="card-title">{item.product}</h5>
                                <p className="card-text">{"Measuring Unit - " + item.unit}</p>
                                <p className="card-text">{"Type - " + item.type}</p>
                                <p className="card-text">{"Current Price - " + item.currentPrice + " LKR"}</p>
                                <p className="card-text">{"Expensiveness - " + item.expensiveness}</p>
                                <p className="card-text">{"Status - " + item.status}</p>
                                {
                                    item.status === "Restricted" && (
                                        <a className="btn btn-primary w-100" onClick={() => this.updateproductItem(item.productId,"Not Restricted")}>Un Restrict</a>
                                    )
                                }
                                {
                                    item.status === "Not Restricted" && (
                                        <a className="btn btn-danger w-100" onClick={() => this.updateproductItem(item.productId,"Restricted")}>Restrict</a>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>




                // <div className="card_bodyy">
                //     <div className="card card_body">
                //
                //
                //         <div className="container">
                //             <div className="row">
                //                 <div className="col-sm">
                //                     <img className="productImage" src={item.imageLink}/>
                //                 </div>
                //
                //                 <div className="col-sm">
                //
                //                     <div className="card-body card_body">
                //                         <h5 className="card-title">{item.product}</h5>
                //                         <p className="card-text">{"Measuring Unit - " + item.unit}</p>
                //                         <p className="card-text">{"Type - " + item.type}</p>
                //                         <p className="card-text">{"Current Price - " + item.currentPrice + " LKR"}</p>
                //                         <p className="card-text">{"Expensiveness - " + item.expensiveness}</p>
                //                         <p className="card-text">{"Status - " + item.status}</p>
                //                         {
                //                             item.status === "Restricted" && (
                //                                 <a className="btn btn-primary" onClick={() => this.updateproductItem(item.productId,"Not Restricted")}>Un Restrict</a>
                //                             )
                //                         }
                //                         {
                //                             item.status === "Not Restricted" && (
                //                                 <a className="btn btn-danger" onClick={() => this.updateproductItem(item.productId,"Restricted")}>Restrict</a>
                //                             )
                //                         }
                //
                //
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //
                //
                //
                //
                //
                //     </div>
                // </div>

            )
        })



        return(
            <div>

                {this.state.isLoading && (
                    <div className="loading_screen">
                        <div className="loader"/>
                    </div>
                )}

                {!this.state.isLoading &&   <a className="btn btn-primary add_suppliers_btn" onClick={() => this.GoToAddProducts()}>Add Products</a>
                }

                {!this.state.isLoading &&  <div className="orders_container">{listItems}</div>
                }



            </div>


        );
    }

    getProductsList = () =>
    {
        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Products");

        let list = [];
        list.push("hello");

        ref.once('value',(snapshot) => {

            const list = snapshot.val();
            let newList = [];
            for(let i in list)
            {
                newList.push(list[i]);
                this.setState({
                    productsList : newList,
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

    GoToAddProducts = () =>{
       window.location.href = "/products/add";
    }

    updateproductItem = (productId,status) =>{

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Products").child(productId).child("status");
        ref.set(status, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                window.location.href = '/products';
            }
        })

    }
}
export default App;
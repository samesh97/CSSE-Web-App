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
          ordersList : []
        };


    }

    componentDidMount() {
        this.getOrdersList();
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
                            <a className="btn btn-primary order_edit_update_btn">Edit</a>
                            <a className="btn btn-danger ml-2 order_edit_update_btn">Delete</a>
                        </div>
                    </div>
                </div>
            )
        })



        return(
            <div className="orders_container">{listItems}</div>

        );
    }

    getOrdersList = () =>{

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
                    ordersList : newList
                });

            }

        })
    }
}
export default App;
import React from "react";

import LoginState from '../Config/LoginState';
import Firebase from '../Database/FirebaseConfig';

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state ={
            orderList : [],
            isLoading : true
        }
    }
    componentDidMount()
    {
        const id = LoginState.getCompanyId();
        this.getAllOrders(id);
    }

    render() {

        const list = this.state.orderList.map(order => {
            return (
                <div className="card card_con mb-1">
                <div className="card-body">
                    <h5 className="card-title">{order.refNo}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{order.status}</h6>
                    <p className="card-text">{order.product.product + " ( " + order.quantity + " " + order.unit + " )"}</p>
                    <p className="card-text">{"Cost - " + order.priceExpected + " LKR"}</p>
                    <p className="card-text">{"To - " + order.supplier.supplierName}</p>
                    <p className="card-text">{order.dateRequired}</p>
                    { order.status === "Pending" &&
                        <a className="btn btn-primary approve_btn" onClick={() => this.Update(order.orderId,"Approved")}>Approve</a>
                    }
                    { order.status === "Pending" &&
                        <a className="btn btn-danger approve_btn ml-2" onClick={() => this.Update(order.orderId,"Declined")}>Decline</a>
                    }


                </div>
            </div>)
        })

        return(
            <div>
                {this.state.isLoading && (
                    <div className="loading_screen">
                        <div className="loader"/>
                    </div>
                )}

                {
                    !this.state.isLoading &&
                    <div className="order_div">
                        {list}
                    </div>
                }

            </div>

        )
    }
    getAllOrders = (id) => {

        const ref = Firebase.database().ref("Orders");
        ref.once('value',(snapshot) => {

            const orders = snapshot.val();
            let orderList = [];
            for(let i in orders)
            {
                let order = orders[i];

                if(order.companyId === id)
                {
                    orderList.push(order);
                }

            }

            this.setState({
                orderList : orderList,
                isLoading : false
            });



        });

    }
    Update = (id,status) => {

        this.setState({
            isLoading : true
        });
        const ref = Firebase.database().ref("Orders").child(id).child("status");
        ref.set(status, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                window.location.href = '/';
            }
        })
    }
}
export default App;
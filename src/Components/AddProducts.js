import React from "react";

import css from '../Css/App.css';
import firebase, {storage} from '../Database/FirebaseConfig';
import register_image from "../Images/hello.png";
import LoginState from "../Config/LoginState";

class App extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
          supplierList : [],
            product : '',
            supplier : '',
            unit : '',
            type : '',
            currentPrice : '',
            expensiveness : '',
            status : '',
            image : ''
        };
    }

    componentDidMount() {
        this.getSupplierList();
    }

    render() {


           const options =  this.state.supplierList.map(item => {
                return  <option value={item.supplierName}>{item.supplierName}</option>
            })


        return(
            <div className="App">
                <div  className="w-100">
                    <form className="w-50" id="register_root">

                        <img src={register_image} className="register_image"/>


                        <div  id="container">

                            <div className="form-group add_product_first_input">
                                <select name="product" id="product" className="form-control input" onChange={(e) => this.setState({product : e.target.value})}>
                                    <option value="">Product</option>
                                    <option value="Cement">Cement</option>
                                    <option value="Stone">Stone</option>
                                    <option value="Brick">Brick</option>
                                    <option value="Sand">Sand</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <select name="supplier" id="supplier" className="form-control input" onChange={(e) => this.setState({supplier : e.target.value})}>
                                    <option value="">Supplier</option>
                                    {options}
                                </select>
                            </div>

                            <div className="form-group">
                                <select name="unit" id="unit" className="form-control input" onChange={(e) => this.setState({unit : e.target.value})}>
                                    <option value="">Unit</option>
                                    <option value="Bag">Bag</option>
                                    <option value="Kilo">Kilo</option>
                                    <option value="Cubes">Cubes</option>
                                    <option value="Liters">Liters</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <select name="type" id="type" className="form-control input" onChange={(e) => this.setState({type : e.target.value})}>
                                    <option value="">Type</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Hardware Materials">Hardware Materials</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Paint">Paint</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input type="text"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       onChange={(e) => this.setState({currentPrice : e.target.value})}
                                       placeholder="Current Price Per Unit"/>
                            </div>

                            <div className="form-group">
                                <select name="expensiveness" id="expensiveness" className="form-control input" onChange={(e) => this.setState({expensiveness : e.target.value})}>
                                    <option value="">Expensiveness</option>
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="High">High</option>
                                    <option value="Extremely">Extremely</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <select name="status" id="status" className="form-control input" onChange={(e) => this.setState({status : e.target.value})}>
                                    <option value="">Status</option>
                                    <option value="Not Restricted" >Not Restricted</option>
                                    <option value="Restricted" disabled>Restricted</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input type="file"
                                       className="form-control input"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       onChange={(e) => this.setState({image : e.target.files[0]})}
                                       placeholder="Pick Image"/>
                            </div>

                            <div className="register_btn_container">
                                <button type="submit" className="btn btn-primary registerbtn" onClick={(e) => this.addProduct(e)}>Add Product</button>
                            </div>


                        </div>



                    </form>
                </div>
            </div>
        )
    }

    OnProductSelected = (value) =>
    {

    }

    getSupplierList = () =>{

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers");

        let list = [];
        list.push("hello");

        ref.once('value',(snapshot) => {

            const list = snapshot.val();
            let newList = [];
            for(let i in list)
            {
                newList.push(list[i]);
                this.setState({
                    supplierList : newList,
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

    addProduct(e)
    {
        e.preventDefault();

        if(this.state.product === "")
        {
            alert("Please select product");
            return;
        }
        if(this.state.supplier === "")
        {
            alert("Please select supplier");
            return;
        }
        if(this.state.unit === "")
        {
            alert("Please select unit");
            return;
        }
        if(this.state.type === "")
        {
            alert("Please select product type");
            return;
        }
        if(this.state.currentPrice === "")
        {
            alert("Please enter current price");
            return;
        }
        if(this.state.expensiveness === "")
        {
            alert("Please select expensiveness");
            return;
        }
        if(this.state.status === "")
        {
            alert("Please select status");
            return;
        }
        if(this.state.image === "")
        {
            alert("Please select an image");
            return;
        }

        let d = new Date();
        let time = d.getMilliseconds();
        let random = Math.floor(Math.random() * 10000000);

        let key = time * random;

        //upload image
        const imageAsFile = this.state.image;
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        this.PutProductInTheDatabase(fireBaseUrl,key);
                    })
            })

    }

    PutProductInTheDatabase = (imageLink,key) =>
    {

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Products").child(key);
        const product = {
            productId : key,
            product : this.state.product,
            supplier : this.state.supplier,
            unit : this.state.unit,
            type : this.state.type,
            currentPrice: this.state.currentPrice,
            expensiveness : this.state.expensiveness,
            status : this.state.status,
            imageLink : imageLink


        }

        ref.set(product, function(error) {
            if (error)
            {
                alert("An error occurred!" + error.message);
            }
            else
            {
                alert("Product was added successfully!");
                window.location.href = '/products/add';
            }
        })

    }
}
export default App;
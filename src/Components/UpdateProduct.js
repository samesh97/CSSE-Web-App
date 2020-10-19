import React from "react";


import firebase, {storage} from "../Database/FirebaseConfig";
import LoginState from '../Config/LoginState';
import register_image from "../Images/hello.png";
import {Multiselect} from "multiselect-react-dropdown";

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            supplierList : [],
            id : '',
            product : '',
            suppliers : '',
            unit : '',
            type : '',
            currentPrice : '',
            expensiveness : '',
            status : '',
            imageLink : '',
            image : '',
            isLoading : true
        };
    }

    componentDidMount()
    {
        this.getSupplierList();
        const supplierId = this.props.match.params.id;
        this.getProduct(supplierId);
    }

    render() {


        const optionList = [];
        const options =  this.state.supplierList.map(item => {
            optionList.push(item);
        })


        return(
            <div className="App">
                {
                    !this.state.isLoading &&
                    <div  className="w-100">
                        <form className="w-50" id="register_root">

                            <img src={this.state.imageLink} className="register_image"/>


                            <div  id="container">

                                <div className="form-group add_product_first_input">
                                    <select name="product"
                                            id="product" className="form-control input"
                                            value={this.state.product}
                                            onChange={(e) => this.setState({product : e.target.value})}>
                                        <option value="">Product</option>
                                        <option value="Cement">Cement</option>
                                        <option value="Stone">Stone</option>
                                        <option value="Brick">Brick</option>
                                        <option value="Sand">Sand</option>
                                        <option value="Tiles">Tiles</option>
                                        <option value="Roofing Sheets">Roofing Sheets</option>
                                        <option value="Electrical Materials">Electrical Materials</option>
                                        <option value="Aluminium">Aluminium</option>
                                        <option value="Paint">Paint</option>
                                        <option value="Nuts and Bolts">Nuts and Bolts</option>
                                    </select>
                                </div>

                                <div className="w-75 drop_down">

                                        <Multiselect
                                            options={optionList} // Options to display in the dropdown
                                            selectedValues={this.state.suppliers} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="supplierName" // Property name to display in the dropdown options
                                        />

                                </div>

                                <div className="form-group">
                                    <select name="unit" id="unit" value={this.state.unit} className="form-control input" onChange={(e) => this.setState({unit : e.target.value})}>
                                        <option value="">Unit</option>
                                        <option value="Bag">Bag</option>
                                        <option value="Kilo">Kilo</option>
                                        <option value="Cubes">Cubes</option>
                                        <option value="Liters">Liters</option>
                                        <option value="Item">Item</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select name="type" id="type" value={this.state.type} className="form-control input" onChange={(e) => this.setState({type : e.target.value})}>
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
                                           value={this.state.currentPrice}
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           onChange={(e) => this.setState({currentPrice : e.target.value})}
                                           placeholder="Current Price Per Unit"/>
                                </div>

                                <div className="form-group">
                                    <select name="expensiveness" value={this.state.expensiveness} id="expensiveness" className="form-control input" onChange={(e) => this.setState({expensiveness : e.target.value})}>
                                        <option value="">Expensiveness</option>
                                        <option value="Low">Low</option>
                                        <option value="Normal">Normal</option>
                                        <option value="High">High</option>
                                        <option value="Extremely">Extremely</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select name="status" value={this.state.status} id="status" className="form-control input" onChange={(e) => this.setState({status : e.target.value})}>
                                        <option value="">Status</option>
                                        <option value="Not Restricted" >Not Restricted</option>
                                        <option value="Restricted">Restricted</option>
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
                                    <button type="submit" className="btn btn-primary registerbtn" onClick={(e) => this.updateProduct(e)}>Update Product</button>
                                </div>


                            </div>



                        </form>
                    </div>
                }
                {this.state.isLoading && (
                    <div className="loading_screen">
                        <div className="loader"/>
                    </div>
                )}

            </div>
        )
    }
    updateProduct(e)
    {
        e.preventDefault();

        if(this.state.product === "")
        {
            alert("Please select product");
            return;
        }
        if(this.state.suppliers.length === 0)
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



        this.setState({
            isLoading : true
        })

        if(this.state.image !== "")
        {
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
                            this.PutProductInTheDatabase(fireBaseUrl);
                        })
                })
        }
        else
        {
            this.PutProductInTheDatabase(this.state.imageLink);
        }





    }
    PutProductInTheDatabase = (imageLink) =>
    {


        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Products").child(this.state.id);

        const product = {
            productId : this.state.id,
            product : this.state.product,
            suppliers : this.state.suppliers,
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
                alert("Product was updated successfully!");
                window.location.href = '/products';
            }
        })

        this.setState({
            isLoading : false
        })


    }
    getSupplierList = () =>{

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Suppliers");

        ref.once('value',(snapshot) => {

            const list = snapshot.val();
            let newList = [];
            for(let i in list)
            {
                newList.push(list[i]);
            }
            this.setState({
                supplierList : newList,
                isLoading : true
            });

        })
    }

    getProduct = (productId) =>{

        const ref = firebase.database().ref("Companies").child(LoginState.getCompanyId()).child("Products").child(productId);
        ref.once('value',(snapshot) => {

            const item = snapshot.val();

            this.setState({
                id : item.productId,
                product : item.product,
                suppliers :  item.suppliers,
                unit : item.unit,
                type : item.type,
                currentPrice : item.currentPrice,
                expensiveness : item.expensiveness,
                status : item.status,
                imageLink : item.imageLink,
                image : '',
                isLoading : false
            });
        });
    }
    onSelect = (selectedList, selectedItem) =>
    {
        let currentList = this.state.suppliers;
        currentList.push(selectedItem);

        this.setState({
            suppliers : currentList
        })
    }

    onRemove = (selectedList, removedItem) =>
    {

        let currentList = this.state.suppliers;

        let newList = [];

        this.state.suppliers.map(item => {

            if(item.supplierId !== removedItem.supplierId)
            {
                newList.push(item);
            }
        })

        this.setState({
            suppliers : newList
        })


    }
}
export default App;
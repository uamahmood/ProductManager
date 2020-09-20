import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "@reach/router"

const DisplayAllProducts = props => {

    const { counter, setCounter } = props
    const [products, setProducts] = useState([])

    useEffect( () => {
        axios.get("http://localhost:8000/api/products")
            .then(response => setProducts(response.data.Products))
            .catch(err => console.log("There was an error", err))
    }, [counter.count])

    const getProductUrl = item => {
        return `/products/${item._id}`
    }

    const deleteProduct = url => {
        axios.delete("http://localhost:8000/api" + url)
            .then(response => console.log("Product was successfully deleted: ", response))
            .then(()=> setCounter( {count: -1} ))
            .catch(error => console.log("There was a problem: ", error))
    }

    return(
        <div className="container">
            <div className="row" style={{borderTop: "1px solid lightgrey"}}>
                <div className="col-6 offset-3 text-center" style={{marginTop: "10px"}}>
                    <h2> All Products</h2>
                </div>
                <div className="col-6 offset-3 text-center">
                    {
                        products.map( (item, i)=> 
                            <p key={i} style={{marginTop: "10px"}}>
                                <Link to={ getProductUrl(item) }>{item.title}</Link>
                                <button onClick={ (e)=>{deleteProduct(getProductUrl(item))}  } className="btn btn-danger btn-sm" style={{marginLeft: "20px"}}>delete</button>
                            </p>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default DisplayAllProducts
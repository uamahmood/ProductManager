import React, { useState, useEffect } from "react"
import axios from "axios"
import { navigate } from "@reach/router"



const EditView = props => {

    const { id } = props
    const [product, setProduct] = useState({})
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")



    useEffect( () => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(response => {
            setProduct(response.data.product[0])
            setTitle(response.data.product[0].title)
            setPrice(response.data.product[0].price)
            setDescription(response.data.product[0].description)

        })
        .catch(error => console.log("There was an error", error))
    }, [])

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/${id}`, {
            title,
            price,
            description
        })
            .then(() => navigate("/"))
            .catch(error => console.log("There was a problem: ", error))
    }

    const BackButton = e => navigate(`/products/${id}`)

    return(
        <div className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <h3 className="text-center">Edit Product:</h3>
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input onChange={e => setTitle(e.target.value)} type="text" placeholder={product.title} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input onChange={e => setPrice(e.target.value)} type="number" step="0.01" placeholder={product.price} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea onChange={e => setDescription(e.target.value)} className="form-control" style={{height: "150px", overflow:"auto"}} placeholder={product.description}></textarea>
                        </div>
                        <div className="form-group text-right">
                            <button onClick={ BackButton } type="button" className="btn btn-secondary btn-md" style={{marginRight: "10px"}}>Back</button>
                            <button className="btn btn-success btn-md">Save</button>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditView
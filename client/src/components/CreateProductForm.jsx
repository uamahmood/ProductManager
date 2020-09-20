import React, { useState } from "react"
import axios from "axios"

const CreateProductForm = props => {

    const { counter, setCounter } = props
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/products", {
            title,
            price,
            description
        })
            .then(response => console.log("Response: ", response))
            .then(response => setCounter( {count: +1} ))
            .catch(error => console.log("Error: ", error))
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <h2 className="text-center">Product Manager</h2>
                    <form onSubmit={ onSubmitHandler }>
                        <div className="form-group">
                            <label>Title:</label>
                            <input onChange={e=>setTitle(e.target.value)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input onChange={e=>setPrice(e.target.value)} type="number" step={0.01} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea onChange={e=>setDescription(e.target.value)} className="form-control" style={{height: "150px", overflow:"auto"}}></textarea>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary btn-md" style={{width: "120px"}}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProductForm
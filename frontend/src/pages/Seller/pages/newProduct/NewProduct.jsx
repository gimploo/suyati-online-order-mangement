import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";
import BackendContext from "context/BackendContext";
import { useContext, useState } from "react";
import "./newProduct.css";

export default function NewProduct() {

  const { user, add_product, categories } = useContext(BackendContext)

  const [imageContent, setImageContent] = useState(null)

  const createProduct = (e) => {

    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
    const quantity = e.target.quantity.value;
    const status = e.target.status.value;
    add_product(name, price, category, quantity, status, imageContent);
  }

  return (
    <div className="newProduct border-2 p-8 m-auto w-1/2 ">
      <h1 className="addProductTitle">New Product</h1>

      <form onSubmit={createProduct} className="addProductForm" >
        <div className="addProductItem">
          <label>Image</label>
          <input name='image' type="file" onChange={(e) => setImageContent({ selectedFile: e.target.files[0] })} />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input name='name' type="text" placeholder="Product name" />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input name='quantity' type="number" placeholder="01" />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select name='category'>
            {
              categories.map((category, index) => (
                <option value={`${index + 1}`}> {category[1]}</option>
              ))
            }
          </select>
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input name='price' type="number" placeholder="10.00" />
        </div>

        <div className="addProductItem">
          <label>Active</label>
          <select name='status' id="active">
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <input value="Submit" type="submit" className="addProductButton" />
      </form>
    </div>
  );
}

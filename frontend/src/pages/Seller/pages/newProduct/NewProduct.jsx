import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";
import axios from "axios";
import BackendContext from "context/BackendContext";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import "./newProduct.css";

const todaysDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '-' + mm + '-' + yyyy;

  return formattedToday
}

export default function NewProduct() {

  const { API_SERVER_URL, add_product, categories } = useContext(BackendContext)
  const [imageContent, setImageContent] = useState(null)
  const [sdStock, setSdStock] = useState(null)
  const [dpPrice, setDpPrice] = useState(0)
  const [userSelectedStock, setUserSelectedStock] = useState(0)
  const tdate = todaysDate()

  const ml_SeasonalDemand = async (category) => {
    await axios.post(`${API_SERVER_URL}/product/category/stock/recommendation`, { category: category })
      .then((res) => {
        if (res.status == 200) {
          const data = JSON.parse(res.data)
          setSdStock(data)
          setUserSelectedStock(data.avg)
        }
      })
  }

  const ml_DynamicPrice = async (demand) => {
    await axios.post(`${API_SERVER_URL}/product/price/recommendation`,
      {
        category: demand.category,
        demand: demand.avg,
        date: tdate
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          setDpPrice(res.data)
        }
      })
  }

  const stockOnChange = async (e) => {
    e.preventDefault()
    const category = categories[e.target.value - 1][1]
    await ml_SeasonalDemand(category)
  }

  const sliderOnChange = async (e) => {
    e.preventDefault()
    setUserSelectedStock(e.target.value)
  }

  const createProduct = (e) => {

    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
    const quantity = e.target.quantity.value;
    const status = e.target.status.value;
    add_product(name, price, category, quantity, status, imageContent);
  }

  useEffect(() => {
    ml_SeasonalDemand("electronic")
  }, [categories])

  useEffect(() => {
    ml_DynamicPrice(sdStock)
  }, [sdStock])

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
          <label>Category</label>
          <select onChange={stockOnChange} name='category'>
            {
              categories.map((category, index) => (
                <option value={`${index + 1}`}> {category[1]}</option>
              ))
            }
          </select>
        </div>
        <div class='flex'>
          <div className="addProductItem">
            <label>Stock</label>
            <h1 class='m-2 text-lg font-semibold text-gray-600 p-2 text-center'>{userSelectedStock}</h1>
          </div>
          <div className="addProductItem bg-yellow-300 p-2 rounded-md">
            <label class='text-center'>Recommended (seasonal demand)</label>
            <div class='flex space-x-4'>
              <label >{sdStock?.min}</label>
              <input name='quantity' class='font-semibold' onChange={sliderOnChange} type="range" min={sdStock?.min} max={sdStock?.max} value={userSelectedStock} />
              <label>{sdStock?.max}</label>
            </div>
          </div>

        </div>
        <div class='flex'>
          <div className="addProductItem">
            <label>Price</label>
            <h1 class='m-2 text-lg font-semibold text-gray-600 p-2 text-center'>{dpPrice}</h1>
          </div>
          <div className="addProductItem bg-yellow-300 p-2 rounded-md">
            <label class='text-center'>Recommended (dynamic price)</label>
          </div>

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

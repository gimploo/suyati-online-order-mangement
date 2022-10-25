import "./productList.css";
import { DataGrid, gridColumnsTotalWidthSelector } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Sidebar from "pages/Seller/components/sidebar/Sidebar";
import axios from 'axios'
import BackendContext from "context/BackendContext";

export default function SellerProductList() {

  const { API_SERVER_URL, COOKIE_USER_INFO } = useContext(BackendContext)
  const [products, setProducts] = useState([])
  const [data, setData] = useState([]);

  const user = localStorage.getItem(COOKIE_USER_INFO)
  const userdata = JSON.parse(user)
  console.log(user)
  console.log(userdata)

  const loadData = async () => {
    let tmp = []
    await axios.post(`${API_SERVER_URL}/user/product/all/`, { username: userdata.username })
      .then((res) => {
        if (res.status == 200) {
          setProducts(res.data)
          // convert product to data format accecpted by this template
          const stuff = res.data.data;
          for (let i = 0; i < stuff.length; i++) {
            const product = stuff[i]
            tmp.push({
              id: i,
              name: product.name,
              img: product.image,
              stock: product.quantity,
              status: product.status == 1 ? "active" : "inactive",
              price: product.price,
            })
          }
          setData(tmp)
        }
      })
  }

  useEffect(() => {
    loadData()
  }, [])


  const handleDelete = async (name) => {

    axios.post(`${API_SERVER_URL}/product/delete/`, 
      { username : userdata.username, productname: name })
    .then ((res) => {
      if (res.status = 200) 
        loadData()
      else 
        alert("handle delete error")

    })
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/seller/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.name)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='md:flex md:justify-center md:align-center md:m-4'>
      <div className='container' >
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

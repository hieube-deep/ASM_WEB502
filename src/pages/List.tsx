import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

type Products = {
  id: number,
  name: string,
  price: number,
  sale: boolean,
  category: string,
  image: string
}
function List() {
  const [products, setProducts] = useState<Products[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products')
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    fecthProducts()
  }, [])

  const numberformat = (price: number) => {
    if (price === 0) return "0 VNĐ"
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ"
  }

  const HandlDelete = async (id: number) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa không?")) {
        await axios.delete(`http://localhost:3000/products/${id}`)
        return setProducts(products.filter(item => item.id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }


  const categories = [...new Set(products.map(item => item.category))]

  const filteredProducts = products.filter(item => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category)
    )
  })

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm sản phẩm..."
            style={{ width: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            style={{ width: 180 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Tất cả danh mục --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <Link to="/add" className="btn btn-success">
          Thêm mới
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Danh mục</th>
              <th>Ảnh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={index}>
                <td className="fw-bold">{item.name}</td>
                <td className="text-danger fw-semibold">
                  {numberformat(item.price)}
                </td>
                <td>
                  {item.sale ? (
                    <span className="badge bg-success">Còn hàng</span>
                  ) : (
                    <span className="badge bg-secondary">Hết hàng</span>
                  )}
                </td>
                <td>{item.category}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/edit/${item.id}`}
                    className="btn btn-sm btn-outline-primary me-2" > Sửa    </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => HandlDelete(item.id)} > Xóa </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  Không có sản phẩm phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List

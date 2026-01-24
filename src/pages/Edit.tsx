import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
type valueForm = {
  name: string,
  price: number,
  rate: "high" | "middle" | "low",
  sale: boolean,
  category: string,
  image: string
}
function Edit() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<valueForm>();
  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        reset({ ...data });
      } catch (error) {
        console.log(error);

      }
    }
    fecthProducts();
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, data);
      toast.success('sửa sản phẩm thành công');
      nav("/list");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form className="card shadow-lg border-0 p-4 p-md-5" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="mb-4 fw-semibold"> sửa sản phẩm</h4>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-medium">Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: Áo thun nam"
              {...register("name", {
                required: "Tên sản phẩm không được để trống",
                minLength: {
                  value: 3,
                  message: "tên sản phẩm phải có nhiều hơn 3 ký tự "
                },
                maxLength: {
                  value: 20,
                  message: "tên sản phẩm phải có ít hơn 20 ký tự "
                }
              })}
            />
            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium">Giá sản phẩm</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="0"
                {...register("price", {
                  required: "Giá sản phẩm không được để trống",
                  min: {
                    value: 1,
                    message: "Giá phải lớn hơn 0"
                  },
                  valueAsNumber: true,
                  validate: (value) => !isNaN(value) || "nhập giá không hợp lệ"
                })}
              />
              <span className="input-group-text">₫</span>

            </div>
            {errors.price && <span className='text-danger'>{errors.price.message}</span>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Ảnh sản phẩm</label>
          <input type="file" className="form-control"
            {...register("image")}
          />
          <small className="text-muted">Chấp nhận JPG, PNG</small>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Đánh giá (Rate)</label>

          <div className="d-flex gap-4 mt-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="high"
                {...register("rate", { required: true })}
              />
              <label className="form-check-label">
                High
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="middle"
                {...register("rate")}
              />
              <label className="form-check-label">
                Middle
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="low"
                {...register("rate")}
              />
              <label className="form-check-label">
                Low
              </label>
            </div>
          </div>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-medium">Trạng thái</label>
            <select
              className="form-select"
              {...register("sale", {
                setValueAs: (v) => v === "true"
              })}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="true">còn hành</option>
              <option value="false">hết hành</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium">Danh mục</label>
            <select className="form-select"
              {...register("category", { required: true })}
            >
              <option value="">-- Chọn danh mục --</option>
              <option value="Thời trang">Thời trang</option>
              <option value="Giày dép">Giày dép</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-primary px-4">
            Lưu sản phẩm
          </button>
        </div>
      </form>
    </>
  )
}

export default Edit
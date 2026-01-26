import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type CourseForm = {
  name: string;
  credit: number;
  category: "Cơ sở" | "Chuyên ngành" | "Tự chọn";
  teacher: string;
};

function Add() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CourseForm>();

  const onSubmit = async (data: CourseForm) => {
    try {
      await axios.post("http://localhost:3000/courses", data);
      toast.success("Thêm khóa học thành công");
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="card shadow-lg border-0 p-4 p-md-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-4 fw-semibold">Thêm khóa học</h4>

        {/* Tên khóa học */}
        <div className="mb-3">
          <label className="form-label fw-medium">Tên khóa học</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ví dụ: ReactJS Cơ Bản"
            {...register("name", {
              required: "Tên khóa học không được để trống",
              minLength: {
                value: 3,
                message: "Tên khóa học phải lớn hơn 3 ký tự"
              }
            })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>

        {/* Số tín chỉ */}
        <div className="mb-3">
          <label className="form-label fw-medium">Số tín chỉ</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ví dụ: 3"
            {...register("credit", {
              required: "Số tín chỉ không được để trống",
              min: {
                value: 1,
                message: "Số tín chỉ phải lớn hơn 0"
              },
              valueAsNumber: true
            })}
          />
          {errors.credit && (
            <span className="text-danger">{errors.credit.message}</span>
          )}
        </div>

        {/* Danh mục */}
        <div className="mb-3">
          <label className="form-label fw-medium">Danh mục</label>
          <select
            className="form-select"
            {...register("category", { required: "Vui lòng chọn danh mục" })}
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Cơ sở">Cơ sở</option>
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Tự chọn">Tự chọn</option>
          </select>
          {errors.category && (
            <span className="text-danger">{errors.category.message}</span>
          )}
        </div>

        {/* Giảng viên */}
        <div className="mb-4">
          <label className="form-label fw-medium">Giảng viên</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ví dụ: Nguyễn Văn A"
            {...register("teacher", {
              required: "Tên giảng viên không được để trống",
              minLength: {
                value: 3,
                message: "Tên giảng viên phải lớn hơn 3 ký tự"
              }
            })}
          />
          {errors.teacher && (
            <span className="text-danger">{errors.teacher.message}</span>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary px-4">
            Lưu khóa học
          </button>
        </div>
      </form>
    </>
  );
}

export default Add;

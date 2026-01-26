import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export type Course = {
  id?: number;
  name: string;
  credit: number;
  category: "Cơ sở" | "Chuyên ngành" | "Tự chọn";
  teacher: string;
};

function List() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get<Course[]>(
          "http://localhost:3000/courses"
        );
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa không?")) {
        await axios.delete(`http://localhost:3000/courses/${id}`);
        setCourses(courses.filter(course => course.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoryOptions = [...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    (selectedCategory === "" || course.category === selectedCategory)
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm khóa học..."
            style={{ width: 220 }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <select
            className="form-select"
            style={{ width: 180 }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Tất cả danh mục --</option>
            {categoryOptions.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Link to="/add" className="btn btn-success">
          Thêm khóa học
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Tên khóa học</th>
              <th>Số tín chỉ</th>
              <th>Danh mục</th>
              <th>Giảng viên</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map(course => (
              <tr key={course.id}>
                <td className="fw-bold">{course.name}</td>
                <td>{course.credit}</td>
                <td>{course.category}</td>
                <td>{course.teacher}</td>
                <td>
                  <Link
                    to={`/edit/${course.id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Sửa
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(course.id!)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Không có khóa học phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default List;

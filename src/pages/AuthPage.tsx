import React from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
    isLogin?: boolean;
};

type FormValues = {
    username?: string;
    email: string;
    password: string;
}

function AuthPage({ isLogin }: Props) {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormValues>();
    const password = watch("password");

    const onSubmit = async (values: FormValues) => {
        try {
            console.log("Sending data:", values);
            if (isLogin) {
                const { data } = await axios.post("http://localhost:3000/login", values);
                localStorage.setItem("accessToken", data.accessToken);
                toast.success("Đăng nhập thành công");
                setTimeout(() => {
                    nav('/')
                }, 500)
            }
            else {
                await axios.post("http://localhost:3000/register", values);
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    nav("/login")
                }, 500);
            }
        } catch (error: any) {
            console.error("Error details:", error.response?.data);
            toast.error(error.response?.data?.message || "Có lỗi xảy ra");
        }
    }

    return (
        <div>
            <div className="container ">
                <h1 className="fs-3 mb-4">
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </h1>
                <div className='d-flex justify-content-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='card shadow-lg border-0 p-3 p-md-4' style={{ maxWidth: "420px", width: "100%" }}>
                        {!isLogin && (
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    {...register("username", {
                                        required: "Username không để trống",
                                        minLength: {
                                            value: 4,
                                            message: "Tên phải nhập nhiều hơn 4 ký tự"
                                        }
                                    })}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                />
                                {errors.username && <span className="text-danger">{errors.username.message}</span>}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                {...register("email", {
                                    required: "Email không để trống",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email không đúng định dạng"
                                    }
                                })}
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                {...register("password", {
                                    required: "Password không để trống",
                                    minLength: {
                                        value: 6,
                                        message: "Password nhiều hơn 6 ký tự"
                                    }
                                })}
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary px-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
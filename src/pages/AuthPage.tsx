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
            if (isLogin) {
                const { data } = await axios.post("http://localhost:3000/login", values);
                localStorage.setItem("accessToken", data.accessToken);
                toast.success("đăng nhập thành công");
                nav("/list");
            }
            else {
                await axios.post("http://localhost:3000/register", values);
                toast.success("Đăng ký thành công");
                nav("/auth/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="container">
                <h1 className="fs-3 mb-4">
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {!isLogin && (
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                {...register("username", {
                                    required: "Username không để trống",
                                    minLength: {
                                        value: 4,
                                        message: "tên phải nhập nhiều hơn 4 ký tự"
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
                                    message: "Invalid email format"
                                }
                            })}
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
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
    )
}
export default AuthPage;


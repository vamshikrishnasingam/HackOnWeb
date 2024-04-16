// DynamicComponent.jsx
import React, { useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { loginContext } from '../../contexts/loginContext';

function LoginPage() {
    let [, loginUser, userLoginStatus, loginErr,] = useContext(loginContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const submitForm = async (userCredObj) => {
        try {
            setLoading(true);
            await loginUser(userCredObj);
            setTimeout(() => {
                if (userLoginStatus) {
                    navigate('/hackathons');
                }
            }, 2000);
        } finally {
            setLoading(false);
        }
    };



    return (
        /*<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{isLoginForm ? 'Login' : 'Signup'}</h2>
                <form onSubmit={formik.handleSubmit}>
                    {isLoginForm ? (
                        <div>
                            <label className="block mb-2">Email:</label>
                            <input type="email" name="email" placeholder="Enter your email" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                            <label className="block mb-2">Password:</label>
                            <input type="password" name="password" placeholder="Enter your password" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
                            <p className="mt-4">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>Signup</span></p>
                        </div>
                    ) : (
                        <div>
                            <label className="block mb-2">Name:</label>
                            <input type="text" name="name" placeholder="Enter your name" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                            <label className="block mb-2">Email:</label>
                            <input type="email" name="email" placeholder="Enter your email" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                            <label className="block mb-2">Password:</label>
                            <input type="password" name="password" placeholder="Enter your password" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Signup</button>
                            <p className="mt-4">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>Login</span></p>
                        </div>
                    )}
                </form>
            </div>
        </div>*/
        <div className="flex flex-wrap">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                    <p className="text-center text-3xl font-bold">HackonWeb</p>
                    <p className="mt-2 text-center text-gray-500">Welcome back, please enter your details.</p>
                    <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white" onClick={() => navigate('/sign-up')}>New User ? Sign Up</button>
                    <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                        <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
                    </div>
                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(submitForm)}>
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <Form.Control
                                    type="email" {...register("email")} id="login-email"
                                    className="form-control-lg w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
                            </div>
                        </div>
                        <div className="mb-12 flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <Form.Control
                                    type="password" {...register("password")} id="login-password"
                                    className="form-control-lg w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" />
                            </div>
                        </div>
                            <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">Log in</button>
                    </form>
                    <div className="py-12 text-center">
                        <p className="whitespace-nowrap text-gray-600">
                            Forgot password??
                            <Link to="/sign-up" className="underline-offset-4 font-semibold text-gray-900 underline">Click Here..</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
                <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
                    <p className="mb-8 text-3xl font-semibold leading-10">Work 10x faster than Your compeititors and stay consistant. </p>
                    <p className="mb-4 text-3xl font-semibold">HackOnWeb</p>
                </div>
                <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </div>
        </div>

    );
}

export default LoginPage;

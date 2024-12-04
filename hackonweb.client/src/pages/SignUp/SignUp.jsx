import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const submitForm = async (formData) => {
        try {
            setLoading(true);
            // Make API request to signup endpoint
            const response = await axios.post('https://localhost:7151/api/Hackathons/CreateNewUser', formData);
            console.log(response.data); // Assuming the API response contains relevant data upon successful signup
            setSuccess(true);
            setError(null);
            navigate('/login')
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred during signup.');
        } finally {
            setLoading(false);
        }
    };

    return (

        /*<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <div className="mt-1">
                <input
                  id="id"
                  name="id"
                  type="text"
                  autoComplete="id"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.id}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="firstname"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>*/
        <div className="flex flex-wrap">
            <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
                <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
                    <p className="mb-8 text-3xl font-semibold leading-10">Work 10x faster than Your compeititors and stay consistant. </p>
                    <p className="mb-4 text-3xl font-semibold">HackOnWeb</p>
                </div>
                <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </div>
            <div className="flex w-full flex-col md:w-1/2">
                <div className="lg:m-10">
                    <form className="relative  space-y-3 max-w-screen-md mx-auto   p-6 lg:p-10" onSubmit={handleSubmit(submitForm)}>
                        <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <label className=""> First Name </label>
                                <input type="text" {...register("firstname")} placeholder="Your Name" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                            </div>
                            <div>
                                <label className=""> Last Name </label>
                                <input type="text" {...register("lastname")} placeholder="Last  Name" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                            </div>
                        </div>
                        <div>
                            <label className=""> Username </label>
                            <input type="text" {...register("username")} placeholder="Username" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                        </div>
                        <div>
                            <label className=""> Email Address </label>
                            <input type="email" {...register("email")} placeholder="Info@example.com" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                        </div>
                        <div>
                            <label className=""> Password </label>
                            <input type="password" {...register("password")} placeholder="******" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                        </div>
                        <div className="grid gap-3 lg:grid-cols-2">
                            {/*<div>
                                <label className=""> Gender </label>
                                <div className="relative w-56 mt-2 bg-gray-100 rounded-lg">
                                    <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                                    <label htmlFor="select-1" className="flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring">Select Option </label>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                                        <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Male</li>
                                        <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Female</li>
                                        <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Other</li>
                                    </ul>
                                </div>
                            </div>*/}
                            <div>
                                <label className=""> Phone: <span className="text-sm text-gray-400"></span> </label>
                                <input type="text" {...register("phone")} placeholder="+543 5445 0543" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
                            </div>
                        </div>

                        {/*<div className="checkbox">
                            <input type="checkbox" id="chekcbox1" checked="" />
                            <label for="checkbox1">I agree to the <a href="#" target="_blank" className="text-blue-600"> Terms and Conditions </a> </label>
                        </div>*/}

                        <div>
                            <button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">
                                {loading ? 'Signing Up...' : 'Get Started'}
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {success && <p className="text-green-500 mt-2">Signup successful!</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default SignUp;

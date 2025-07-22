import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';  // ✅ Correct source for useNavigate


const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

const onSubmit = (data) => {
  console.log(data);       // logs form data
  navigate('/home');       // ✅ redirects to /home
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className='bg-violet-400 text-shadow-md'><h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Login</h2>
</div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            {...register("username", { required: true })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">Username is required</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", { required: true })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

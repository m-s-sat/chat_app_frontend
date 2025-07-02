"use client"
import { createUserAsync, selectUser } from "@/lib/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form";
interface FormValues{
    phoneNumber:Number,
    username:string,
    password:string,
    confirmPassword:string,
}

export default function Signup(){
    const {register, handleSubmit,getValues, formState:{errors}} = useForm<FormValues>();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    return(
    <>
    {user && router.push('/')}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit((data)=>{
            dispatch(createUserAsync({phoneNumber:data.phoneNumber,username:data.username,password:data.password}))
          })}>
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username", {
                    required: "username is required",
                    pattern: {
                        value: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
                        message: "Invalid username format"
                    }
                  })}
                  type="username"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.username && <p className="text-red-500">{errors.username?.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone_number"
                  {...register("phoneNumber", {
                    required: "phoneNumber is required",
                    pattern: {
                        value: /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                        message: "Invalid phone number format"
                    }
                  })}
                  type="tel"
                  required
                  autoComplete="phoneNumber"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.username && <p className="text-red-500">{errors.username?.message}</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password",{
                    required:"Password is required",
                    pattern:{
                        value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                        message:"At least one uppercase letter ([A-Z])\nAt least one lowercase letter ([a-z])\nAt least one digit (\d)\nAt least one special character (@$!%*?#&)\nMinimum 8 characters"
                    }
                  })}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("confirmPassword",{
                    required:"Password is required",
                    pattern:{
                        value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                        message:"At least one uppercase letter ([A-Z])\nAt least one lowercase letter ([a-z])\nAt least one digit (\d)\nAt least one special character (@$!%*?#&)\nMinimum 8 characters"
                    },
                    validate:(value)=>
                        value===getValues("password") || "Password must be same"
                  })}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account{' '}
            <Link href="/auth/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
          </p>
        </div>
    </div>
    </>
    )
}
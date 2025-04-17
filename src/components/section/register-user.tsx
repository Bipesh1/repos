"use client";
import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentSchema } from "@/formschemas/student";
import Link from "next/link";

// Update the schema to include termsAccepted
const extendedSchema = studentSchema.extend({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to register"
  })
});

type RegisterFormValues = z.infer<typeof extendedSchema>;

export default function RegisterUser() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(extendedSchema),
    defaultValues: {
      userName: "",
      email: "",
      mobile: "",
      password: "",
      termsAccepted: false,
    },
  });

  // Watch the termsAccepted value to determine if submit should be enabled
  const termsAccepted = watch("termsAccepted");

  const onSubmit = (data: RegisterFormValues) => {
    startTransition(async () => {
      try {
        // Remove termsAccepted from data before sending to the API
        const { termsAccepted, ...apiData } = data;
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
          apiData,
          { withCredentials: true }
        );
        if(response.status==201){
          toast.success(
            "A verification message has been sent to your email. Please Verify the email! ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } catch (error: any) {
        toast.error("The email is already in use ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg mx-auto border border-gray-200">
      <ToastContainer />
      
      {/* Loader */}
      {isPending && (
        <div className="flex justify-center">
          <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="loading"
            colors={["#2563EB", "#2563EB", "#10B981", "#10B981", "#F59E0B"]}
          />
        </div>
      )}

      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Register <span className="text-secondary">Yourself</span>!
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div>
          <input
            {...register("userName")}
            type="text"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Username"
          />
          {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
        </div>

        {/* Row with Email and Mobile Fields */}
        <div className="flex gap-4">
          {/* Email Field */}
          <div className="flex-1">
            <input
              {...register("email")}
              type="email"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Mobile Field */}
          <div className="flex-1">
            <input
              {...register("mobile")}
              type="text"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Mobile"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <input
            {...register("password")}
            type="password"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start gap-2">
          <input
            {...register("termsAccepted")}
            type="checkbox"
            id="termsAccepted"
            className="mt-1 "
          />
          <label htmlFor="termsAccepted" className="text-sm text-gray-700">
            I agree to the <span className="text-secondary cursor-pointer hover:underline">Terms and Conditions</span> and <span className="text-secondary cursor-pointer hover:underline">Privacy Policy</span>
          </label>
        </div>
        {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

        {/* Forgot Password */}
        <div className="text-right">
          <span className="text-secondary cursor-pointer hover:underline text-sm">Forgot Password?</span>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 ${!termsAccepted ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'} text-white font-semibold rounded-lg transition duration-200`}
          type="submit"
          disabled={isSubmitting || !termsAccepted}
        >
          {isSubmitting ? "Registering..." : "Register Now"}
        </button>
      </form>

      {/* Already have an account? */}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login"><span className="text-secondary cursor-pointer hover:underline">Login</span></Link> 
      </p>
    </div>
  );
}
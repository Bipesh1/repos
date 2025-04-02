"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgotPasswordAdmin } from "../forgotpasswordadmin";
import { setTokenCookie } from "@/app/(protected)/actions/cookie";
// Define form schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const dynamic = 'force-dynamic';

export default function LoginSuperAdmin() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/superadmin/login`,
          data,
          {
            withCredentials: true,
          }
        );
        setTokenCookie(response.data.refreshToken)
        router.replace("/dashboard");
      } catch (error: any) {
        if (error.response.status == 404) {
          toast.error("Admin Not Found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  };
  return (
    <div className="form-container shadow-lg space-y-4 p-6 rounded-lg">
      <ToastContainer />
      {isPending && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#4C8BBD", "#4C8BBD", "#4C8BBD", "#67BE60", "#67BE60"]}
        />
      )}
      <p className="title text-2xl font-bold">
        Welcome <span className="text-primary">Back!</span>
      </p>
      <form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email")}
            type="email"
            className="input w-full p-2 border rounded"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            className="input w-full p-2 border rounded"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          className="form-btn w-full bg-primary  text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log in Now"}
        </button>
      </form>
      <div className="page-link text-right">
        <span className="page-link-label text-blue-500 cursor-pointer hover:underline text-sm">
          <ForgotPasswordAdmin />
        </span>
      </div>
    </div>
  );
}

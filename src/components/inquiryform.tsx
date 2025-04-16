"use client";
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { userFormSchema } from "@/formschemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function InquiryForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      number: "",
      text: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
    const onSubmit=(values:z.infer<typeof userFormSchema>)=>{
      startTransition(async()=>{
        const response= await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sendenquiry`,values,{
          withCredentials:true
        })
        if(response.status==200){
          form.reset()
          toast.success('Your inquiry has been sent succesfully', {
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
      })

    }
  return (
    <form className="form max-w-[500px] space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer/>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg font-bold text-blue-900">Get in Touch</p>
        <p className="text-2xl font-bold text-primary">
          Please Drop Your Inquiry Here
        </p>
      </div>
      <div className="logo-container ">
        <Image src={logo} alt="" width={100} height={100} className="mx-auto" />
      </div>
      <div className="input-container">
        <label>Full Name</label>
        <input
          type="text"
          id="name"
          className="bg-white"
          placeholder="Enter your full name"
          {...register("fullname")}
          required
        />
        {errors.fullname && (
          <p className="text-red-500">{errors.fullname.message}</p>
        )}

        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <div className="input-container">
        <label>Email</label>
        <input
          type="text"
          id="email"
          className="bg-white"
          placeholder="Enter your email"
          {...register("email")}
          required
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label>Mobile Number</label>
        <input
          type="text"
          id="number"
          className="bg-white"
          placeholder="Enter your mobile number"
          {...register("number")}
          required
        />
        {errors.number && (
          <p className="text-red-500">{errors.number.message}</p>
        )}
    
        <label>Inquiry</label>
        <textarea
          rows={9}
          className="outline-none resize-none bg-white
           "
          id="inquiry"
          {...register("text")}
          placeholder="Enter your academic qualifications and GPA, your choice country, university or course. "
          required
        />
        {errors.text && (
          <p className="text-red-500">{errors.text.message}</p>
        )}
      </div>
      <button className="submit" type="submit">
        {isPending?"Submiting..":"Submit"}
        
      </button>
    </form>
  );
}

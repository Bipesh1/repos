'use server'
import getToken from "@/helpers/getToken";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { ActionResponse } from ".";


export async function getBlogs(): Promise<ActionResponse<any[]>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
      }
    }
    );
  
      return { data: response.data.blogs, msg: "Blogs fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

export async function getBlog(id:string): Promise<ActionResponse<any[]>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
      }
    }
    );
  
      return { data: response.data.blog, msg: "Blogs fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }



export async function createBlog(values:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidateTag('/blogs')
      return { data: response.data,msg:"Created Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }
export async function updateBlog(values:any, id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidateTag('/blogs')
      return { data: response.data,msg:"Edited Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }



   export async function deleteBlog(id:any): Promise<ActionResponse<any>> {
      try {
        const token =await getToken()
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`,{
          withCredentials: true,
          headers:{
            'Authorization': `Bearer ${token}`,
          }
      });
        revalidateTag('/blogs')
        return { data: response.data,msg:"Deleted Succesfully", error: null };
      } catch (error: unknown) {
        return { data: null, error:"An error occured"};
      }
    }
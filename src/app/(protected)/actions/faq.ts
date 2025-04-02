"use server"
import getToken from "@/helpers/getToken";
import { ActionResponse } from ".";
import axios from "axios";
import { revalidateTag } from "next/cache";
// Get active store categories
export async function getActiveFaq(): Promise<ActionResponse<any[]>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
      }
    }
    );
  
      return { data: response.data.faqs, msg: "Categos fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function createFaq(values:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq/`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      
      revalidateTag('/faq')
      return { data: response.data,msg:"Created Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function fetchFaqById(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq/${id}`,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
   
      return { data: response.data,msg:"Fetched Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function editFaq(values:any,id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq/${id}`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidateTag('/faq')
      return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function deleteFaq(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq/${id}`,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
    
      revalidateTag('/faq')
      return { data: response.data,msg:"Deleted Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function fetchFaqByCountry(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq/country/${id}`,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });

      return { data: response.data.faqs,msg:"Fetched Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }
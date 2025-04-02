"use server"
import getToken from "@/helpers/getToken";
import { ActionResponse } from ".";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function getActiveCountries(): Promise<ActionResponse<any[]>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
      }
    }
    );
      return { data: response.data.countries, msg: "Countries fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function createCountry(values:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidatePath('/countries')
     
      return { data: response.data,msg:"Created Succesfully", error: null };
    } catch (error: any) {
      if(error.response.status==400){
        return { data: null, error:"An error occured",status:400};
      }
      return { data: null, error:"An error occured"};
    }
  }

  export async function fetchCountryById(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${id}`,{
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

  export async function editCountry(values:any,id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${id}`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidatePath('/countries')
      return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };

    } catch (error: any) {
      if(error.response.status==400){
        return { data: null, error:"An error occured",status:400};
      }
      return { data: null, error:"An error occured"};
    }
  }

  export async function deleteCountry(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country/${id}`,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidatePath('/countries')
      return { data: response.data,msg:"Deleted Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }
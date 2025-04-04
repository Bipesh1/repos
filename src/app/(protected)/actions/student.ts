"use server"
import getToken from "@/helpers/getToken";
import { ActionResponse } from ".";
import axios from "axios";
import { revalidatePath} from "next/cache";
import { cookies } from "next/headers";


export async function getStudentsByAdmin(): Promise<ActionResponse<any[]>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/bycounselor`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
    }
    );
        
      return { data: response.data, msg: "Students fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function getActiveStudents(): Promise<ActionResponse<any[]>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
    }
    );
        
      return { data: response.data, msg: "Students fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }


   export async function editStudent(values:any,id:any): Promise<ActionResponse<any>> {
      try {
        const token =await getToken()
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update-by-admin/${id}`,values,{
          withCredentials: true,
          headers:{
            'Authorization': `Bearer ${token}`,
          }
      });
      console.log(response)
        revalidatePath('/students')
        return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
      } catch (error: unknown) {
        return { data: null, error:"An error occured"};
      }
    }

    export async function assignCounselor(values:any,id:any): Promise<ActionResponse<any>> {
      try {
        const token =await getToken()
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/assign-counselor/${id}`,values,{
          withCredentials: true,
          headers:{
            'Authorization': `Bearer ${token}`,
          }
      });
        revalidatePath('/students')
        return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
      } catch (error: unknown) {
        return { data: null, error:"An error occured"};
      }
    }

    export async function fetchStudentById(id:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-student/${id}`,{
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

      export async function deleteStudent(id:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}`,{
            withCredentials: true,
            headers:{
              'Authorization': `Bearer ${token}`,
            }
        });
       
          revalidatePath('/students')
          return { data: response.data,msg:"Deleted Succesfully", error: null };
        } catch (error: unknown) {
          return { data: null, error:"An error occured"};
        }
      }

      export async function addedToWishlist(values:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/wishlist`,values,{
            withCredentials: true,
            headers:{
              'Authorization': `Bearer ${token}`,
            }
        });
          revalidatePath('/universities')
          return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
        } catch (error: unknown) {
          return { data: null, error:"An error occured"};
        }
      }
      export async function getWishlist(): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/wishlist`,{
            withCredentials: true,
            headers:{
              'Authorization': `Bearer ${token}`,
            }
            
        });
          return { data: response.data,msg:"Fetched Succesfully", error: null, status:200 };
        } catch (error: any) {
          
          return { data: null, error:error};
        }
      }
      export async function editByStudent(values:any,id:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update/${id}`,values,{
            withCredentials: true,
            headers:{
              'Authorization': `Bearer ${token}`,
            }
        });
          revalidatePath('/students')
          return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
        } catch (error: unknown) {
          return { data: null, error:"An error occured"};
        }
      }

      export async function applyByStudent(values:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/apply`,values,{
            withCredentials: true,
            headers:{
              'Authorization': `Bearer ${token}`,
            }
        });
          revalidatePath('/students')
          return { data: response.data,msg:"Applied Succesfully", error: null, status:200 };
        } catch (error: unknown) {
          return { data: null, error:"An error occured"};
        }
      }

      export async function Logout() {
          try {
            // Get the cookies
            const cookieStore = cookies();
            
            // Retrieve refreshToken (optional for debugging)
            const refreshToken = (await cookieStore).get("refreshToken");
            
        
            // Delete the refreshToken cookie
            (await cookieStore).delete("refreshToken");
        
            // Optional: Revalidate the page after logout
            revalidatePath("/login");
        
            return { data: null, msg: "Logged out successfully", error: null, status:200 };
          } catch (error) {
            console.error("Logout error:", error);
            return { data: null, error: "An error occurred" };
          }
        }
      
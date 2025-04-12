"use server"
import getToken from "@/helpers/getToken";
import { ActionResponse } from ".";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export async function getActiveAdmin(): Promise<ActionResponse<any[]>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          
      }
    }
    );
  
      return { data: response.data, msg: "Countries fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function createAdmin(values:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/register`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
    
      revalidatePath('/admin')
      return { data: response.data,msg:"Created Succesfully", error: null };
    } catch (error: unknown) {
        
      return { data: null, error:"An error occured"};
    }
  }

  export async function fetchAdminById(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/${id}`,{
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

  export async function editAdmin(values:any,id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update/${id}`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidatePath('/admin')
      return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function deleteAdmin(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/${id}`,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
   
      revalidatePath('/admindashboard')
      return { data: response.data,msg:"Deleted Succesfully", error: null };
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

  export async function updateAdminPassword(adminId:any, newPassword:any) {
    console.log(adminId,newPassword)
    try {
      // Validate password before sending to backend
      if (newPassword.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long" };
      }
      
      if (!/[A-Z]/.test(newPassword)) {
        return { success: false, message: "Password must contain at least one uppercase letter" };
      }
      
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        return { success: false, message: "Password must contain at least one special character" };
      }
  
      // Get token from cookies
      const token = await getToken()
      
      if (!token) {
        return { success: false, message: "Authentication token not found" };
      }
  
      // Make API call to backend using axios
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/password`,
        {
          password: newPassword,
          _id:adminId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
  
      // Invalidate page cache to reflect changes
      
      return { success: true, message: "Password updated successfully" };
    } catch (error:any) {
      console.error("Password update error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || "An error occurred while updating the password" 
      };
    }
  }
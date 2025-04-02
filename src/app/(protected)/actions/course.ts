"use server"
import getToken from "@/helpers/getToken";
import { ActionResponse } from ".";
import axios from "axios";
import { revalidatePath} from "next/cache";

export async function createCourse(values:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
     
      revalidatePath('/courses')
      return { data: response.data,msg:"Created Succesfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function getActiveCourses(): Promise<ActionResponse<any[]>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
      }
    }
    );
    
      return { data: response.data.courses, msg: "Courses fetched successfully", error: null };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  export async function fetchCourseById(id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${id}`,{
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


  
  export async function editCourse(values:any,id:any): Promise<ActionResponse<any>> {
    try {
      const token =await getToken()
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${id}`,values,{
        withCredentials: true,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
    });
      revalidatePath('/courses')
      return { data: response.data,msg:"Edited Succesfully", error: null, status:200 };
    } catch (error: unknown) {
      return { data: null, error:"An error occured"};
    }
  }

  
      export async function deleteCourse(id:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${id}`,{
            withCredentials: true,
            headers:{
              'Authorization': `Bearer ${token}`,
            }
        });
         
          revalidatePath('/courses')
          return { data: response.data,msg:"Deleted Succesfully", error: null };
        } catch (error: unknown) {
          return { data: null, error:"An error occured"};
        }
      }

      export async function fetchCourseByUniversity(id:any): Promise<ActionResponse<any>> {
        try {
          const token =await getToken()
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/university/${id}`,{
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
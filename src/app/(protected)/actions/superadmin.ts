"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
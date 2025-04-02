"use server"
import getToken from "@/helpers/getToken";
import { ActionResponse } from ".";
import axios from "axios";


export async function checkUser(): Promise<ActionResponse<any>> {
    try {
      const token = await getToken();
      if (!token) {
        return { data: null, error: "Authentication required" };
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkuser`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) {
        return { data: null, error: `Server error: ${response.status}` };
      }
      
      const data = await response.json();
      return { data: data, msg: "User fetched successfully", error: null };
    } catch (error: unknown) {
      console.error("Error checking user:", error);
      return { data: null, error: "An error occurred" };
    }
  }
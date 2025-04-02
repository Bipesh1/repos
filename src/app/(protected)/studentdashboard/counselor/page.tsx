import { CounselorDataTable } from "./(components)/counselor-data-table";
import getToken from "@/helpers/getToken";
import {jwtDecode} from "jwt-decode";
import { fetchStudentById } from "../../actions/student";
import { fetchAdminById } from "../../actions/admin";
import { checkUser } from "../../actions/user";


export const dynamic = 'force-dynamic';

export default async function Page() {
    const response = await checkUser()
    const data = response.data
    const dataArray = Array.isArray(data) ? data : [data];

  
  

  return (
    <div className="container mx-auto space-y-8">
        <h2 className="text-xl">Communicate with your Counselor <span className="text-primary">Here.</span></h2>
            <CounselorDataTable  data={dataArray}/>
    </div>  
  )
  
  ;
}

import { UniDataTable } from "./(components)/fav-uni-data-table";
import getToken from "@/helpers/getToken";
import {jwtDecode} from "jwt-decode";
import { fetchStudentById, getWishlist } from "../../actions/student";
import { fetchAdminById } from "../../actions/admin";
import { checkUser } from "../../actions/user";


export const dynamic = 'force-dynamic';

export default async function Page() {
    const response = await getWishlist()
    const data= response.data.wishlist
  
  

  return (
    <div className="container mx-auto space-y-8">
        <h2 className="text-xl">Your favourite Universities <span className="text-primary">Here.</span></h2>
            <UniDataTable  data={data}/>
    </div>  
  )
  
  ;
}

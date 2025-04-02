
import AdminCreate from "./(components)/admin-create";
import { AdminDataTable } from "./(components)/admin-data-table";
import { getActiveCountries } from "../../actions/country";
import { getActiveAdmin } from "../../actions/admin";


  

export default async function Page() {
    const response= await getActiveAdmin();
    const data= response.data || [];

  
  

  return (
    <div className="container mx-auto space-y-8">
        <div className="float-end">
           <AdminCreate/>
        </div>
        <h2 className="text-xl">Manage Admins <span className="text-primary">Here.</span></h2>
            <AdminDataTable  data={data}/>
    </div>  
  )
  
  ;
}

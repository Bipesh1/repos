
import UniversityCreate from "./(components)/university-create";
import { getActiveUniversities } from "../../actions/university";
import { UniversityDataTable } from "./(components)/university-datatable";


export const dynamic = 'force-dynamic';

export default async function Page() {
    const response= await getActiveUniversities();
    const data= response.data || [];

  

  return (
    <div className="container mx-auto space-y-8">
        <div className="float-end">
            <UniversityCreate/>
        </div>
        <h2 className="text-xl">Manage your Universities <span className="text-primary">Here.</span></h2>
            <UniversityDataTable  data={data}/>
    </div>  
  )
  
  ;
}

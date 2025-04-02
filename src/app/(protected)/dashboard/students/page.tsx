import { StudentDataTable } from "./(components)/student-datatable";
import { getActiveStudents } from "../../actions/student";

export default async function Page() {
    const response= await getActiveStudents();
    const data= response.data || [];


  

  return (
    <div className="container mx-auto space-y-8">
        <h2 className="text-xl">Manage Students <span className="text-primary">Here.</span></h2>
            <StudentDataTable data={data}/>
    </div>  
  )
  
  ;
}

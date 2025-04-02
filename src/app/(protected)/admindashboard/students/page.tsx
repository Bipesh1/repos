import { StudentDataTable } from "./(components)/student-datatable";
import { getActiveStudents, getStudentsByAdmin } from "../../actions/student";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const response= await getStudentsByAdmin();
    const data= response.data || [];

  // if (results.error) {
  //   return (
  //     <AlertBox
  //       variant="destructive"
  //       title="Error"
  //       description={`${results.error}`}
  //     />
  //   );
  // }

  

  return (
    <div className="container mx-auto space-y-8">
        <h2 className="text-xl">Manage Students <span className="text-primary">Here.</span></h2>
            <StudentDataTable data={data}/>
    </div>  
  )
  
  ;
}

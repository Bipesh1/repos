
import CourseCreate from "./(components)/course-create";
import { CourseDataTable } from "./(components)/course-data-table";
import { getActiveCourses } from "../../actions/course";

  
export const dynamic = 'force-dynamic';
export default async function Page() {
    const response= await getActiveCourses();
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
        <div className="float-end">
            <CourseCreate/>
        </div>
        <h2 className="text-xl">Manage your Courses <span className="text-primary">Here.</span></h2>
        <CourseDataTable data={data}/>
    </div>  
  )
  
  ;
}

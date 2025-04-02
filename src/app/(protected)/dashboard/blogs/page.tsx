
import BlogsCreate from "./(components)/blogs-create";
import { getBlogs } from "../../actions/blog";
import { BlogDataTable } from "./(components)/blog-table";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const response= await getBlogs();
    const data = response.data || [];
  return (
    <div className="container mx-auto space-y-8">
        <div className="float-end">
           <BlogsCreate/>
        </div>
        <h2 className="text-xl">Manage your Blogs <span className="text-primary">Here.</span></h2>
        <BlogDataTable  data={data}/>
    </div>  
  )
  
  ;
}

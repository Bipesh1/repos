
import { DataTable } from "./(components)/faq-data-table";

import FaqCreate from "./(components)/faq-create";
import { getActiveFaq } from "../../actions/faq";


export const dynamic = 'force-dynamic';

export default async function Page() {
    const response= await getActiveFaq();
    const data= response.data || [];
  

  return (
    <div className="container mx-auto space-y-8">
        <div className="float-end">
            <FaqCreate/>
        </div>
        <h2 className="text-xl">Manage your FAQs <span className="text-primary">Here.</span></h2>
            <DataTable  data={data}/>
    </div>  
  )
  
  ;
}

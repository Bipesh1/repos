
import CountriesCreate from "./(components)/countries-create";

import { CountriesDataTable } from "./(components)/countries-data-table";
import { getActiveCountries } from "../../actions/country";


  

export default async function Page() {
    const response= await getActiveCountries();
    const data= response.data || [];

  
  

  return (
    <div className="container mx-auto space-y-8">
        <div className="float-end">
           <CountriesCreate/>
        </div>
        <h2 className="text-xl">Manage Countries <span className="text-primary">Here.</span></h2>
            <CountriesDataTable  data={data}/>
    </div>  
  )
  
  ;
}

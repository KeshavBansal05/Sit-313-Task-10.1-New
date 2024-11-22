import { createContext, useEffect, useState } from "react";
import staffList from '../staffList';
import { addCollectionandDocuments } from "../utils/Firebase";
import { fetchCollectionandDocuments } from "../utils/Firebase";



export const StaffContext = createContext({
    staff:[]
})


/*export const StaffProvider = ({children}) => 
{
    const [staff , setstaff] = useState([])

    useEffect(() =>{

        addCollectionandDocuments('staff' , staffList)
        console.log("succesfull")


        addCollectionandDocuments('staff', staffList);
        const fetchedStaff = fetchStaffDocuments();
        setStaff(fetchedStaff)
    },[]) */

   

    export const StaffProvider = ({ children }) => {
        const [staff, setStaff] = useState({}); 
          useEffect(() => {
      
            const staffFunc = async()=>{
              const staffmap = await fetchCollectionandDocuments()
              console.log(staffmap) 
              setStaff(staffmap)
            }
            staffFunc()
           
        }, [])
        
        const value = {staff}
        return (
          <StaffContext.Provider value={value}>
            {children}
          </StaffContext.Provider>
        );
      };

    



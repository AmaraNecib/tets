"use server"
import {DataTableDemo} from "@/components/Cards/StoresDateTable";
import { getUsers } from "@/lib/users";



const Users = async  () => {
  return (
  <main>
    <DataTableDemo  />  
  </main>
  )
}
export default Users;

// users={getUsers}
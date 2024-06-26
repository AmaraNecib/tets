"use server"
import {DataTableDemo} from "@/components/Cards/UsersDateTable";
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
"use server"


export const deleteUser =async (userId: any) =>{

  const data= await fetch(`http://localhost:3000/api/delete-user`,{
    method: 'POST',
  cache: 'no-store',
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify({ "userId": userId})
}
)
const res = await data.json()
console.log(res)
return data.status ===200 ? true : false
}




export type UserData = {
  id: number;
  email: string;
  name: string;
  phoneNumbers: string;
  orders: number;
};
export const getUsers = async () => {
  try {
    const data = await fetch(`http://localhost:3000/api/users`,{
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log('json',data);
    return data.users;
  } catch {
    return [];
  }
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};
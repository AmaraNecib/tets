'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addCategory } from "@/lib/addCategory"
import { useState } from "react"

const  InputWithButton = () =>  {
  const [category,setCategory] = useState("")
  const handle = async() =>{
    const res = await addCategory(category);
    const mess = res ? "added" : "please try again";
    alert(mess)
  }
  return (
    <div className="w-full place-content-center">

      <div className="flex items-center py-4">
      <Button onClick={()=> handle()} className="mx-4">إضافة</Button>
      <Input type="text" placeholder="فئة" onChange={(e)=>{setCategory(e.target.value)}}/>
      </div>
    </div>
  )
}
export default InputWithButton;
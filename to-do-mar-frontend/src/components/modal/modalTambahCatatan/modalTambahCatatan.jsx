import { createPortal } from "react-dom"
import { MainModalTambahCatatan } from "./mainModalTambahCatatan"
import "./modalTambahCatatan.css"
import { useState } from "react"
import { useAuthFetch } from "../../../api/authfetch"
import { format } from "date-fns";

export function ModalTambahCatatan({isOpenModalTambahCatatan,setIsOpenModalTambahCatatan,setToDoList}) {

    const [newJudul,setNewJudul] = useState("")
    const [newDeadline,setNewDeadline] = useState("")
    const [newIsiCatatan, setNewIsiCatatan] = useState("")
    const [error,setError] = useState("")
    const authFetch  = useAuthFetch()

    async function handleKirim(){
        setError("")
        if(newJudul == "" || newIsiCatatan==""){
            setError("Isi terlebih dahulu title dan to do")
            return
        }
        const formattedDeadline = newDeadline
          ? format(newDeadline, "yyyy-MM-dd")
          : null;
        
        const newToDo ={
            judul : newJudul,
            deadline: formattedDeadline === "" ? null : formattedDeadline,
            isiCatatan : newIsiCatatan
        }      
        try{
            const res = await authFetch("http://localhost:3000/todos",{
            method:"POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body:JSON.stringify(newToDo)
        })

        if(!res){
            setError("Server Tidak Menanggapi")
            return
        }

        const resultPost = await res.json()

        if(!res.ok){
            setError(resultPost.message || "Terjadi Kesalahan")
            return
        }


        setToDoList((prev)=>[...prev,resultPost])

        setNewJudul("")
        setNewDeadline("")
        setNewIsiCatatan("")
        setIsOpenModalTambahCatatan(false)
        }

        catch(err){
            console.error(err)
            setError("Gagal Terhubung ke Server")
        }
    }

    if(!isOpenModalTambahCatatan)return
    return createPortal(
        <div className="overlayModalTambahCatatan-class" onClick={()=>setIsOpenModalTambahCatatan(false)}>
            <div className="wrapperKontenModalTambahCatatan" onClick={(e)=>e.stopPropagation()}>
                <button className="buttonCloseModalTambahCatatan-class" onClick={()=>setIsOpenModalTambahCatatan(false)}>X</button>
                <div className="kontenModalTambahCatatan-class" >
                    <h1 className="titleModalTambahCatatan-class">Add To Do</h1>
                    <MainModalTambahCatatan
                        newJudul={newJudul}
                        setNewJudul={setNewJudul}
                        newDeadline={newDeadline}
                        setNewDeadline = {setNewDeadline}
                        newIsiCatatan = {newIsiCatatan}
                        setNewIsiCatatan = {setNewIsiCatatan}
                        error = {error}
                    />
                </div>
                <button className="buttonEnterTambahCatatan-class" onClick={handleKirim}><span class="material-symbols-outlined">send</span></button>
            </div>

        </div>
        ,document.getElementById("modal-root")
    )
}   

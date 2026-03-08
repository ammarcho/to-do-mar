import { createPortal } from "react-dom";
import "./modalEditToDo.css"
import DatePicker from "react-datepicker"
import { useState } from "react";
import { useAuthFetch } from "../../api/authfetch";
import { format } from "date-fns";


export function ModalEditToDo({setIsOpenModalEditToDo,selectedToDoEdit,setToDoList}){
    const [judul,setJudul] = useState(selectedToDoEdit.judul)
    const [deadline,setDeadline] = useState(selectedToDoEdit.deadline)
    const [isiCatatan, setIsiCatatan] =useState(selectedToDoEdit.isi_catatan)
    const formattedDeadline = deadline
      ? format(deadline, "yyyy-MM-dd")
      : null;
    const authFetch = useAuthFetch()

    async function handleSimpanEdit(e){
        e.stopPropagation()
        e.preventDefault()
        const res = await authFetch(`http://localhost:3000/todos/${selectedToDoEdit.id}`,{
            method : "PUT",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({judul,deadline:formattedDeadline,isiCatatan})
        })

        const dataUpdate = await res.json()
        setToDoList(prev=>prev.map(todo=>todo.id === dataUpdate.id?dataUpdate:todo))
        setIsOpenModalEditToDo(false)
    }
    return createPortal(
        <div className="backgroundModalEditToDo-class" onClick={()=>setIsOpenModalEditToDo(false)}>
            <div className="wrapperKontenEdit-class" onClick={(e)=>e.stopPropagation()}>
                <button onClick={()=>setIsOpenModalEditToDo(false)} className="buttonCloseEdit-class">X</button>
                <form action="" className="kontenEdit-class" onSubmit={(e)=>handleSimpanEdit(e)}>
                    <input type="text" className="titleEdit-class input-class" value={judul} onChange={(e)=>setJudul(e.target.value)} placeholder="Title"/>
                    <DatePicker 
                        className="input-class"
                        calendarClassName="calendar-small"
                        dateFormat="dd-MM-yyyy" 
                        portalId="root-portal"
                        selected={deadline ? new Date(deadline) : null}
                        onChange={(date)=>setDeadline(date)}
                        placeholderText="Deadline"/>
                    <textarea name="" id="" className="IsiCatatanEdit-class" value={isiCatatan} onChange={(e)=>setIsiCatatan(e.target.value)} placeholder-t="To Do"></textarea>
                    <button className="buttonEnterEditCatatan-class">Save</button>
                </form>
            </div>
        </div>, document.getElementById("modal-root")
    )
}
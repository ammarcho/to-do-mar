import { useState } from "react"
import { ModalClearAll } from "../modal/modalKonfirmasiClearAll"
import "./addSearch.css"


export function AddSearch({setIsOpenModalTambahCatatan,setSearchQuery,searchQuery,setToDoList}){

    const [isKonfirmasiOpen, setIsKonfirmasiOpen] = useState(false)

    return(
        <>
        <div className="addSearch-class">
            <div className="addClear-class">
                <button className="add-class" onClick={()=>setIsOpenModalTambahCatatan(true)}>+</button>
                <button className="clear-class"><span className="material-symbols-outlined" onClick={()=>setIsKonfirmasiOpen(true)}>delete</span></button>
            </div>
            <input type="text" className="search-class" placeholder="search..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
        {isKonfirmasiOpen && <ModalClearAll setToDoList={setToDoList} setIsKonfirmasiOpen={setIsKonfirmasiOpen}/>}
        </>
    )
}
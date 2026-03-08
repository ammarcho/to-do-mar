import { useState } from "react"
import { ModalDetailToDo } from "../modal/modalDetailToDo"
import "./listToDo.css"
import { useAuthFetch } from "../../api/authfetch"
import { ModalEditToDo } from "../modal/modalEditToDo"



export function ListToDo({toDoList,formatDate,setToDoList}){
    const [isOpenModalDetailToDo, setIsOpenModalDetailToDo]  = useState(false)
    const [isOpenModalEditToDo,setIsOpenModalEditToDo] = useState(false)
    const [selectedToDo, setSelectedToDo] = useState(null)
    const [selectedToDoEdit,setSelectedToDoEdit] = useState(null)
    const [isOpenFitur,setIsOpenFitur] = useState(null)
    const authFetch = useAuthFetch()

    async function handleClickSelected(id){
        setIsOpenModalDetailToDo(true)
        const res = await authFetch(`http://localhost:3000/todos/${id}`)

        const data = await res.json()
        setSelectedToDo(data)
    }

    async function handleDelete(e, id) {
        e.stopPropagation()

        await authFetch(`http://localhost:3000/todos/${id}`,
            {method:"DELETE",
            })

        setToDoList(prev=>prev.filter((kotak)=>kotak.id!=id))
    }


    async function handleEditSelected(e,id){
        e.stopPropagation()
        
        const res = await authFetch(`http://localhost:3000/todos/${id}`)
        const dataLama = await res.json()
        
        setSelectedToDoEdit(dataLama)
        setIsOpenModalEditToDo(true)
    }

    function handleOpenFitur(e,id){
        e.stopPropagation()
        setIsOpenFitur(prev =>prev == id ?null:id)
    }

    function FiturKotak({kotak,isOpenFitur}){
        return(
            <div className={`fitur-class ${isOpenFitur?"open":""}`}>
                <button className="editCatatanFitur-class fitur" onClick={(e)=>handleEditSelected(e,kotak.id)}><span className="material-symbols-outlined">edit</span></button>
                <button className="deleteKotakFitur-class fitur" onClick={(e)=>handleDelete(e,kotak.id)}><span className="material-symbols-outlined">delete</span></button>
            </div>
        )
    }

    return(
        <>
            <div className="wrapperListToDo-class">
                <div className="allListToDo-class">
                        {toDoList.map((kotak)=>(
                            <div className="kotakToDo-class" key={kotak.id} onClick={()=>handleClickSelected(kotak.id)}>
                                <button className="openFitur-class" onClick={(e)=>handleOpenFitur(e,kotak.id)}><span className="material-symbols-outlined">more_vert</span></button>
                                {isOpenFitur === kotak.id && <FiturKotak kotak={kotak} isOpenFitur={isOpenFitur}/>}
                                <button className="logoZoom" ><span class="material-symbols-outlined" >zoom_out_map</span></button>
                                <button className="editCatatan-class" onClick={(e)=>handleEditSelected(e,kotak.id)}><span className="material-symbols-outlined">edit</span></button>
                                <button className="deleteKotak-class" onClick={(e)=>handleDelete(e,kotak.id)}><span className="material-symbols-outlined">delete</span></button>
                                <div className="kontenToDo-class"  >
                                    <div className="bagianAtasKotak-class">
                                        <h2 className="titleToDo-class">{kotak.judul}</h2>
                                        <h6 className="deadlineToDo-class">Deadline : {!kotak.deadline?"None":formatDate(kotak.deadline)}</h6>
                                    </div>
                                    <div className="bagianBawahKotak-class">
                                        <p className="isiToDo-class">{kotak.isi_catatan}</p>
                                    </div> 
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {isOpenModalEditToDo && selectedToDoEdit && <ModalEditToDo setIsOpenModalEditToDo={setIsOpenModalEditToDo} selectedToDoEdit={selectedToDoEdit} setToDoList={setToDoList}/>}
            {isOpenModalDetailToDo && <ModalDetailToDo setIsOpenModalDetailToDo={setIsOpenModalDetailToDo} selectedToDo={selectedToDo} formatDate={formatDate}/>}
        </>
    )
}
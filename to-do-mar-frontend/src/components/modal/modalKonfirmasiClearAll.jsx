import { createPortal } from "react-dom"
import { useAuthFetch } from "../../api/authfetch"
import "./modalKonfirmasiClearAll.css"

export function ModalClearAll({setToDoList,setIsKonfirmasiOpen}){
    const authFetch = useAuthFetch()
    async function handleClearToDo(){
        await authFetch("http://localhost:3000/todos",{
            method : "DELETE"})
        setToDoList([])
        setIsKonfirmasiOpen(false)
    }
    return createPortal(
      <div className="backgroundModalKonfirmasiClearAll-class" onClick={()=>setIsKonfirmasiOpen(false)}>
          <div className="kontenModalKonfirmasiClearAll-class" onClick={(e) => e.stopPropagation()}>
            <h2>Yakin Ingin Hapus Semua?</h2>
            <h5>Dengan melakukan tindakan ini berarti anda akan menghapus semua to do list yang ada</h5>
            <div className="buttonKonfirmasiClearAll-class">
                <button className="TidakClearAll-class regButton" onClick={()=>setIsKonfirmasiOpen(false)}>Tidak</button>
                <button className="ClearAll-class regButton" onClick={handleClearToDo}>Hapus</button>
            </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
}
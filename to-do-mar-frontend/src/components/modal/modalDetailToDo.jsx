import { createPortal } from "react-dom"
import "./modalDetailToDo.css"

export function ModalDetailToDo({ setIsOpenModalDetailToDo,selectedToDo,formatDate }) {
    if (!selectedToDo) return null
    return createPortal(
      <div className="backgroundModal-class" onClick={()=>setIsOpenModalDetailToDo(false)}>
          <div className="kontenModal-class" onClick={(e) => e.stopPropagation()}>
              <button className="closeButton-class" onClick={()=>setIsOpenModalDetailToDo(false)}>x</button>
              <div className="kotakToDoModal-class">
                <div className="bagianAtasKotakModal-class">
                  <h1>{selectedToDo.judul}</h1>
                  <h3>Deadline : {formatDate(selectedToDo.deadline)}</h3>
                </div>
                <div className="bagianBawahKotakModal-class">
                  <p>
                    {selectedToDo.isi_catatan}
                  </p>
                </div>
              </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
}   

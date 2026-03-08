import "./modeTeksTambahCatatan.css"

export function ModeTeksTambahCatatan({setNewIsiCatatan,newIsiCatatan}){
    return(
        <div className="modeTeks-class">
            <textarea name="" id="" placeholder="To do" onChange={(e)=>setNewIsiCatatan(e.target.value)} value={newIsiCatatan}></textarea>
        </div>
    )
}

import { useState } from "react"
import { ModeTeksTambahCatatan } from "./modeTeksTambahCatatan"
import "./mainModalTambahCatatan.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function MainModalTambahCatatan({newJudul,setNewJudul,newDeadline,setNewDeadline,newIsiCatatan,setNewIsiCatatan,error}) {
    const [mode, setMode] = useState("teks")


    return (
        <div className="mainModalTambahCatatan-class">
            <div className="modeTambahCatatan-class">
                <ul>
                    <li
                        className={mode === "teks" ? "active" : ""}
                        onClick={() => setMode("teks")}
                    >
                        Text
                    </li>
                    <li
                        className={mode === "list" ? "active" : ""}
                        onClick={() => setMode("list")}
                    >
                        List
                    </li>
                </ul>
            </div>

            <div className="titleDeadlineCatatan-class">
                <input type="text" placeholder="Title" value={newJudul} onChange={(e)=>setNewJudul(e.target.value)}/>
                {/* <input type="text" placeholder="Deadline" value={newDeadline} onChange={(e)=>setNewDeadline(e.target.value)} /> */}
                <DatePicker calendarClassName="calendar-small" selected={newDeadline} onChange={(date) => setNewDeadline(date)} dateFormat="dd-MM-yyyy" placeholderText="Deadline (tanggal-bulan-tahun)" portalId="root-portal"/>
                {mode === "teks" && <ModeTeksTambahCatatan setNewIsiCatatan={setNewIsiCatatan} newIsiCatatan={newIsiCatatan}/>}
                {mode === "list" && <p style={{color:"black"}}>Comming Soon</p>}
                {error && <p className="errorMain-text">{error}</p>}
            </div>
        </div>
    )
}

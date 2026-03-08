import { useEffect, useState } from "react"
import { AddSearch } from "./addSearch"
import "./main.css"
import { MainToDo } from "./mainToDo"
import { ModalTambahCatatan } from "../modal/modalTambahCatatan/modalTambahCatatan"
import { ListToDo } from "./listToDO"
import {SortBy} from "./sortBy"
import { useAuthFetch } from "../../api/authfetch"



export function Main({modeSortBy,setModeSorBy,searchQuery,setSearchQuery}){
    const [isOpenModalTambahCatatan, setIsOpenModalTambahCatatan] = useState(false)
    const [toDoList, setToDoList] = useState([])
    const authFetch = useAuthFetch()

    useEffect(() => {
      async function fetchTodos(){
        try{
          const token = localStorage.getItem("tokenAccess");
          if (!token) return;
        const params = new URLSearchParams()

        if (searchQuery) params.append("search",searchQuery)

        if (modeSortBy === "sortByTitle") params.append("sort","title")
        else if(modeSortBy === "sortByDeadline") params.append("sort","deadline")
        else if (modeSortBy ==="sortByInput")params.append("sort","input")

        const res = await authFetch (`http://localhost:3000/todos?${params.toString()}`)
         if (!res || !res.ok){
           setToDoList([])
           return
         }
        const data =await res.json()
        setToDoList(data)
        }
        catch (err) {
          console.error("Error fetch todos:", err);
          setToDoList([]);
        }
      }
      fetchTodos()
    }, [searchQuery, modeSortBy]);





    function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    }
    
    return(
        <>
        <div className="main-class">
            <AddSearch setIsOpenModalTambahCatatan={setIsOpenModalTambahCatatan} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              setToDoList={setToDoList}
              />
            <MainToDo>
                <SortBy setModeSorBy={setModeSorBy} modeSortBy={modeSortBy}/>
                <ListToDo toDoList={toDoList} formatDate={formatDate} setToDoList={setToDoList}/>
            </MainToDo>
        </div>
        {isOpenModalTambahCatatan &&
        <ModalTambahCatatan 
            isOpenModalTambahCatatan={isOpenModalTambahCatatan} 
            setIsOpenModalTambahCatatan={setIsOpenModalTambahCatatan}
            toDoList={toDoList} 
            setToDoList={setToDoList}/>}
        </>
    )
}
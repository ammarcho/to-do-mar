
import { useState } from 'react'
import './todopage.css'
import { Footer } from '../components/footer/footer'
import { Header } from '../components/header/header'
import { Main } from '../components/main/main'


export function ToDoPage() {
  const [searchQuery,setSearchQuery] = useState("")
  const[modeSortBy,setModeSorBy] = useState("sortByInput")
  function handleMouseMove(e){
    const rect = e.currentTarget.getBoundingClientRect()

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    e.currentTarget.style.setProperty("--x", `${x}%`)
    e.currentTarget.style.setProperty("--y", `${y}%`)
    }


  return (
    <>
    <div className="toDoPage-class" onMouseMove={(e)=>handleMouseMove(e)}>
      <Header
      setModeSorBy={setModeSorBy} setSearchQuery={setSearchQuery} />
      <Main
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      modeSortBy={modeSortBy}
      setModeSorBy={setModeSorBy}/>
      <Footer/>
    </div>

    </>
  )
}


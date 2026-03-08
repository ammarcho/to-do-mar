import "./sortBy.css"

export function SortBy({setModeSorBy,modeSortBy}){
      

    return(
        <div className="sortBy-class">
            <select name="" id="" value={modeSortBy} onChange={(e)=>setModeSorBy(e.target.value)}>
                <option value="sortByInput">Sort By Input</option>
                <option value="sortByDeadline">Sort By Deadline</option>
                <option value="sortByTitle">Sort By Title</option>
            </select>
        </div>
    )
}
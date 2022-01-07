import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"


const Valuta = ({facade, selectvaluta}) => {

    //const [allValutas, setAllValutas] = useState([])
    const [search, setSearch] = useState("")
    const [allSymbols, setAllSymbols] = useState([])
    const [allIcons, setAllIcons] = useState([{code: '', svg: {}}])
    const getSymbols = (data) => {setAllSymbols(data.all)}
    //const getValutas = (data) => {setAllValutas(data)}
    const getIcons = (data) => {setAllIcons(data)}
        
       
        useEffect(()=>{
          facade.fetchData('valuta/symbols', getSymbols);
            facade.fetchData('valuta/flags', getIcons);
         // facade.fetchData('valuta/latest/DKK',getValutas);
        },[])

        let mergedValutas = allSymbols.map(val => {
            let symbols = allIcons.find(item => item.code === val.code)
            return {...val, ...symbols}
        })
       
       // <td>{Math.round((item.value + Number.EPSILON)*100) /100}</td>


       const filteredValutas = mergedValutas.filter(val => val.description.toLowerCase().includes(search.toLowerCase()))
        
    
       const searchChange = (e) => {
           setSearch(e.target.value)
           console.log(search)
       }

    return (
        <div>
        <SearchBar placeholder={"Søg her"} handleChange={searchChange}/>
           <div className="nested-list">
            
            {filteredValutas.map((item) => (
                <div className="valuta-list-line"  key={item.code}>
                {/* <div className="valuta-list-icon">{<img className="svgicon" src={`data:image/svg+xml;utf8,${encodeURIComponent("<svg"+item.svg+"</svg>")}`}></img>}</div> */}
                {<img className="svgicon" id={item.code} onClick={selectvaluta} src={`https://valutakurser.dk/images/flags/${item.code}.svg`}></img>}
                <div id={item.code} onClick={selectvaluta} className="valuta-list-title">{item.description}</div>
                <div className="valuta-list-code">{item.code}</div>
                </div>
             ))}
       </div>
       </div>
    )
}

export default Valuta

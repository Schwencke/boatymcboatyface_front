import { useEffect, useState } from "react"

const ValutaList = ({facade}) => {

    const [allValutas, setAllValutas] = useState([])
    const [allSymbols, setAllSymbols] = useState([])
    const [allIcons, setAllIcons] = useState([{code: '', svg: {}}])
    const getSymbols = (data) => {setAllSymbols(data.all)}
    const getValutas = (data) => {setAllValutas(data)}
    const getIcons = (data) => {setAllIcons(data)}
       
        useEffect(()=>{
          facade.fetchData('valuta/symbols', getSymbols);
            facade.fetchData('valuta/flags', getIcons);
          facade.fetchData('valuta/latest/DKK',getValutas);
        },[])

        let mergedValutas = allSymbols.map(val => {
            let symbols = allIcons.find(item => item.code === val.code)
            let values = allValutas.find(item => item.code === val.code)
            return {...val, ...symbols, ...values}
        })

    return (
        <div className="calc-card">
           <div className="nested-list">
            
            {mergedValutas.map((item) => (
                <div className="valuta-line"  key={item.code}>
                {/* <div className="valuta-list-icon">{<img className="svgicon" src={`data:image/svg+xml;utf8,${encodeURIComponent("<svg"+item.svg+"</svg>")}`}></img>}</div> */}
                {<img className="svgicon" id={item.code} src={`https://valutakurser.dk/images/flags/${item.code}.svg`}></img>}
                <div id={item.code} className="valuta-title">{item.description}</div>
                <div className="valuta-code">{item.code}</div>
                <div className="valuta-value">{Math.round((item.value + Number.EPSILON)*100) /100}</div>
                </div>
             ))}
       </div>
       </div>
    )
}

export default ValutaList

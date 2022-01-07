import { useState, useEffect } from "react"
import facade from "../apiFacade"
import Calcinput from "./Calcinput"
import Valuta from "./Valuta"
import ValutaSymbolSelecter from "./ValutaSymbolSelecter"
import {Modal, Button} from 'react-bootstrap'

const ValutaCalc = () => {

    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')
    const [isBase1, setIsbase1] = useState(false)
    const [isBase2, setIsbase2] = useState(false)
    const [oneActive, setOneActive] = useState(false)
    const [twoActive, setTwoActive] = useState(false)
    const [calc1, setCalc1] = useState(0)
    const [calc2, setCalc2] = useState(0)
    const [selectedValuta1, setSelectedValuta1] = useState('DKK')
    const [selectedValuta2,setSelectedValuta2] = useState('USD')
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleOpen1 = () => {
        setShowModal(true)
        setOneActive(true)
        setTwoActive(false)
    }
    const handleOpen2 = () => {
        setShowModal(true)
        setTwoActive(true)
        setOneActive(false)
    }
    const handleSelect = (e) => {
        if(oneActive){setSelectedValuta1(e.target.id)}
        if(twoActive){setSelectedValuta2(e.target.id)}
        setShowModal(false)
    }
    


    const isActiveBase1 = (e) => {
        setIsbase1(true)
        setIsbase2(false)
       }
    const isActiveBase2 = (e) => {
        setIsbase2(true)
       setIsbase1(false)
   }

   const getConversion1 = (data) => {
       setCalc1(data) 
       setVal2(data)
    }
   const getConversion2 = (data) => {
       setCalc2(data)
       setVal1(data)
    }


    const handleChangeVal1 = (e) => {
        if (isBase1) { setVal1(e.target.value)}
        //else setVal2(calc1)
    }
    const handleChangeVal2 = (e) => {
        if (isBase2) setVal2(e.target.value)
        //else setVal1(calc2)
    }



    useEffect(()=>{
        if (isBase2 && val2 !== 0) facade.fetchData('valuta/convert/'+selectedValuta2+'/'+selectedValuta1+'/'+val2,getConversion2)
        else if (isBase1 && val1 !==0) facade.fetchData('valuta/convert/'+selectedValuta1+'/'+selectedValuta2+'/'+val1,getConversion1)
        console.log(calc1, calc2, val2)
    },[isActiveBase2, isActiveBase1, handleSelect])




    return (
        <div className={"calc"}>
            <h2 className="calc-heading">Beregn valuta</h2>
            <div className={"calc-element"}>
            <Calcinput placeholder={"Skriv beløb.."} handleChange={handleChangeVal1} onKeyDown={isActiveBase1} value={val1}/>
            <ValutaSymbolSelecter code={selectedValuta1} handleChange={handleOpen1}/>
            </div>
            <div className={"calc-element"}>
            <Calcinput placeholder={"Skriv beløb.."} handleChange={handleChangeVal2} onKeyDown={isActiveBase2} value={val2}/>
            <ValutaSymbolSelecter code={selectedValuta2} handleChange={handleOpen2}/>
            </div>
            <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Søg</Modal.Title>
        </Modal.Header>
        <Modal.Body><Valuta facade={facade} selectvaluta={handleSelect}/></Modal.Body>
      </Modal>
        </div>
    )
}

export default ValutaCalc

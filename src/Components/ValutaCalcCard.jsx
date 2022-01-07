import ValutaCalc from "./ValutaCalc"
import Valuta from "./Valuta"
import ValutaList from "./ValutaList"


const ValutaCalcCard = ({facade}) => {
    return (
        <div>
        <div className={"calc-card"}>
            <ValutaCalc facade={facade}/>
        </div>
        <div>
            <ValutaList facade={facade}/>
        </div>
        </div>
    )
}

export default ValutaCalcCard

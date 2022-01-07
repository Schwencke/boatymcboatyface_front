
import ValutaCalc from "./ValutaCalc";
import ValutaCalcCard from "./ValutaCalcCard";
import Valuta from "./Valuta";

const Company = ({facade}) => {
   
    return (
        <div className="wrapper">
            <ValutaCalcCard facade={facade}/>
        </div>
    )
}

export default Company

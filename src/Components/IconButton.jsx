import { Image} from 'react-bootstrap'

const IconButton = ({code, handleChange}) => {
    return (
        <button className="icon_button" onClick={handleChange}>
            <Image className="icon" src={`https://valutakurser.dk/images/flags/${code}.svg`}/>
             <div className="icon_text"><span>{code}</span></div>
            </button>  
    )
}
export default IconButton

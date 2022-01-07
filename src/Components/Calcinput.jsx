

const Calcinput = ({placeholder, handleChange, value, onKeyDown}) => {
    return (
        <input
        className="val"
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        />
    )
}

export default Calcinput

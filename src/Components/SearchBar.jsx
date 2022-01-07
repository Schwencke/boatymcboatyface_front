const SearchBar = ({placeholder, handleChange}) => {
    return (
        <input 
        className="search" 
        type='search' 
        onChange={handleChange} 
        placeholder={placeholder}/>
    )
}

export default SearchBar

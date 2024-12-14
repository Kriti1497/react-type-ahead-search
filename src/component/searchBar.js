import {useState} from 'react'
import useFetchPromise from '../hooks/useFetchPromise';

const SearchBox = ({id, name, label, placeholder, autoComplete, styles, listBox, errorMessage, transformData, promise, debounceWait, noItemMessage}) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
    const [data, setData, error] = useFetchPromise(query, transformData, promise, debounceWait, isAutoComplete);
    const handleChange =(e) => {
        setQuery(e.target.value)
    }
    const handlekeyUp = (event) => {
        const keycode = event.keyCode;
        if (keycode == 13) {
            // user enter
            if (activeIndex === null) return;
            setQuery(data[activeIndex].name);
            setData(null);
            setActiveIndex(null);
            setIsAutoComplete(false);
            return;
        } 
        setIsAutoComplete(true);
        if (!data || data.length === 0) return;
        if (keycode === 40) {
            // move down
            if (activeIndex === null || activeIndex === data.length -1) {
                setActiveIndex(0);
            } else {
                setActiveIndex((prev) => prev +1)
            }
        } else if (keycode === 38) {
            // move up
            if (activeIndex === 0) {
                setActiveIndex(data.length - 1);
            } else {
                setActiveIndex((prev) => prev - 1)
            }
        }
    }
    return <>
        <label className={styles.label} for={name}>{label}</label>
        <br />
        <input 
            id={id}
            name={name}
            className={styles.input}
            value={query}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            autoComplete='off'
            onKeyUp={handlekeyUp}
        />
        {data && data.length > 0 && listBox(data, activeIndex)}
        {query && data && data.length === 0 && noItemMessage()}
        {error && errorMessage()}
    </>
}

export default SearchBox;
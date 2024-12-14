import '../styles/listbox.css'

const ListBox = ({items, activeIndex}) => {
    return <>
        <ul className='listBoxContainer'>
            {items.map((item, index) => <li className={`listBoxItems ${activeIndex === index ? 'activeItem' : ''}`} key={index}>{item.name}</li>)}
        </ul>
    </>;
}

export default ListBox;
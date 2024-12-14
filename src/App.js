import './App.css';
import SearchBar from './component/searchBar';
import ListBox from './component/listBox';

function App() {
  const maxItems = 5;
  const dataPromise = async(query, signal) => await fetch(`https://swapi.dev/api/people/?search=${query}`, {signal})
  const transformData = (data) => data.results.slice(0,maxItems);
  return (
    <div className="wrapper">
      <SearchBar 
        id="personName"
        name="personName"
        label="Enter Person Name"
        placeholder="Enter your fav person name"
        autoComplete={true}
        styles={{
          label: 'label',
          input: 'input'
        }}
        debounceWait={400}
        listBox={(items, activeIndex) => <ListBox items={items} activeIndex={activeIndex}/>}
        noItemMessage={() => <div>Sorry no person found</div>}
        errorMessage={() => <div>Something went wrong</div>}
        transformData={transformData}
        promise={dataPromise}        
      />
    </div>
  );
}

export default App;

import Header from './Header';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './ContentItem';
import { useState, useEffect } from 'react';

function App() {
  const [activities, setActivities] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addItem, setAddItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const styledHeader = {
    display: "grid",
    placeContent: "center",
    marginTop: "15rem"
  };

  // Load items from local storage
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = JSON.parse(localStorage.getItem('activities')) || [];
        setActivities(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(async () => {
      await fetchItems();
    }, 1000);
  }, []);

  // Filter activities based on search term
  const filter = activities.filter((activity) =>
    activity.description.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Save items to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('activities', JSON.stringify(items));
  };

  const handleChange = (id) => {
    const listItems = activities.map((activity) =>
      activity.id === id ? { ...activity, checked: !activity.checked } : activity
    );
    setActivities(listItems);
    saveToLocalStorage(listItems);
  };

  const handleDelete = (id) => {
    const listActivities = activities.filter((activity) => activity.id !== id);
    setActivities(listActivities);
    saveToLocalStorage(listActivities);
  };

  const handleAdd = (item) => {
    const id = (activities.length) ? String(Number(activities.length) + 1) : "1";
    const addActivity = { id, checked: false, description: item };
    const listActivities = [...activities, addActivity];
    setActivities(listActivities);
    saveToLocalStorage(listActivities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addItem) return;
    handleAdd(addItem);
    setAddItem("");
  };

  return (
    <>
      <Header title="To do list" />
      <div className='nav'>
        <AddItem
          handleSubmit={handleSubmit}
          addItem={addItem}
          setAddItem={setAddItem}
        />
        <SearchItem
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
      </div>
      <main>
        {fetchError && <p style={styledHeader}>{`Error: ${fetchError}`}</p>}
        {isLoading && <p style={styledHeader}>Loading Items.....</p>}
        {!isLoading && !fetchError &&
          <Content
            activities={filter}
            handleChange={handleChange}
            handleDelete={handleDelete}
            styledHeader={styledHeader}
          />}
      </main>
      <Footer length={activities.length} />
    </>
  );
}

export default App;

import Header from './Header';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './ContentItem';
import { useState, useEffect } from 'react';
import apiRequest from './ApiRequst';

function App() {
  const [activities, setActivities] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = 'https://json-server-todolist-alpha.vercel.app/';
  const [addItem, setAddItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const styledHeader={
    display:"grid",
    placeContent:"center",
    marginTop:"15rem"
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data Not Received");
        const listItems = await response.json();
        setActivities(listItems);
      }catch (err) {
        setFetchError(err.message);
      }finally {
        setIsLoading(false);
      }
      };
      setTimeout(() => {
      (async () => { await fetchItems() })();
      }, 2000);
  }, []);

  const handleChange = async (id) => {
    const listItems = activities.map((activity) =>
    activity.id === id ? { ...activity, checked: !activity.checked } : activity);
    setActivities(listItems);
    const listActivities = listItems.filter((activity) => activity.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: listActivities[0].checked })
    };
    const reqURL = `${API_URL}/${id}`;
    const request = await apiRequest(reqURL, updateOptions);
    if (request) setFetchError(request);
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete activity with ID: ${id}`);
    const deleteOptions = {
      method: 'DELETE'
    };
    const reqURL = `${API_URL}/${Number(id)}`;
    const request = await apiRequest(reqURL, deleteOptions);
    if (!request) {
      const listActivities = activities.filter((activity) => activity.id !== id);
      setActivities(listActivities);
      console.log(`Deleted activity with ID: ${id}`);
    } else {
      setFetchError(request);
    }
  };

  const handleAdd = async (item) => {
    let id = (activities.length) ? String(Number(activities.length) + 1) :"1";
    let addActivity = { id, checked: false, description: item };
    let listActivities = [...activities, addActivity];
    setActivities(listActivities);
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addActivity)
    };
    const request = await apiRequest(API_URL, postOptions);
    if (request) setFetchError(request);
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
            activities={activities.filter((activity) =>
            activity.description.toLowerCase().includes(searchItem.toLowerCase()) )}
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

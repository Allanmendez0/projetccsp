import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://<BACKEND_IP>:5000/items')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    const addItem = (name) => {
        axios.post('http://<BACKEND_IP>:5000/items', { name })
            .then(response => setItems([...items, response.data]))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map(item => <li key={item._id}>{item.name}</li>)}
            </ul>
            <button onClick={() => addItem('New Item')}>Add Item</button>
        </div>
    );
}

export default App;

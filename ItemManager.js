import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  // Fonction pour récupérer les items depuis l'API
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://<10.4.0.4>:3000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des items:', error);
    }
  };

  // Fonction pour ajouter un nouvel item
  const addItem = async (e) => {
    e.preventDefault();
    if (!newItemName) return; // Ne pas ajouter si le champ est vide

    try {
      const response = await axios.post('http://<10.4.0.4>:3000/items', { name: newItemName });
      setItems([...items, response.data]); // Ajouter le nouvel item à la liste
      setNewItemName(''); // Réinitialiser le champ d'entrée
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'item:', error);
    }
  };

  // Utiliser useEffect pour récupérer les items au premier rendu
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Gestion des Items</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Nom de l'item"
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManager;

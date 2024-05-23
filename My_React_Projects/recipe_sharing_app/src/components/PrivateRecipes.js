// src/components/PrivateRecipes.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container } from 'react-bootstrap';

const PrivateRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchPrivateRecipes = async () => {
      if (user) {
        const q = query(collection(firestore, 'recipes'), where('createdBy', '==', user.uid), where('status', '==', 'private'));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(fetchedRecipes);
      }
    };

    fetchPrivateRecipes();
  }, [user, firestore]);

  return (
    <Container>
      <h2>Your Private Recipes</h2>
      {recipes.length === 0 ? (
        <p>No private recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default PrivateRecipes;

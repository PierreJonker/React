import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersAndRecipes = async () => {
      try {
        const firestore = getFirestore();
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        const recipesSnapshot = await getDocs(collection(firestore, 'recipes'));

        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const recipesList = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setUsers(usersList);
        setRecipes(recipesList);
      } catch (error) {
        setError('Failed to fetch users or recipes');
      }
    };

    fetchUsersAndRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const firestore = getFirestore();
      await deleteDoc(doc(firestore, 'recipes', recipeId));
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      setError('Failed to delete recipe');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <h3>Manage Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.admin ? 'Yes' : 'No'}</td>
              <td>
                {/* Add actions for user management here */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Manage Recipes</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.title}</td>
              <td>{recipe.createdBy}</td>
              <td>{recipe.status}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
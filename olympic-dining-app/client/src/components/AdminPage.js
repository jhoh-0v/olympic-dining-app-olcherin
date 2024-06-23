import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AdminPage() {
  const [dinings, setDinings] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [menu, setMenu] = useState('');

  useEffect(() => {
    const fetchDinings = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/dining', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDinings(response.data);
    };

    fetchDinings();
  }, []);

  const handleAddDining = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post(
      '/api/dining',
      { name, location, menu: menu.split(',') },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDinings([...dinings, response.data]);
    setName('');
    setLocation('');
    setMenu('');
  };

  const handleDeleteDining = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/dining/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDinings(dinings.filter((dining) => dining._id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Page
      </Typography>
      <form onSubmit={handleAddDining}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Menu (comma separated)"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Dining
        </Button>
      </form>
      <List>
        {dinings.map((dining) => (
          <ListItem key={dining._id}>
            <ListItemText
              primary={dining.name}
              secondary={`${dining.location} - Menu: ${dining.menu.join(', ')}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDining(dining._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AdminPage;

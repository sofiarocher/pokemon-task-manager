import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  task: Yup.string().required('The task is required.'),
  pokemon: Yup.string().required('Choose a pokemon.'),
});

const MyForm = ({ handleTaskCreation, pokemonList }) => {
  const handleSubmit = (values, { resetForm }) => {
    const selectedPokemon = pokemonList.find(pokemon => pokemon.name === values.pokemon);
    const newTask = { ...values, pokemon: selectedPokemon };
    handleTaskCreation(newTask);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ task: '', pokemon: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Field
            as={TextField}
            name="task"
            label="Task"
          />
          <ErrorMessage name="task" component="div" />

          <FormControl>
            <InputLabel id="pokemon-label">Pokemon</InputLabel>
            <Field
              as={Select}
              name="pokemon"
              labelId="pokemon-label"
              id="pokemon"
            >
              {pokemonList.map((pokemon) => (
                <MenuItem key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="pokemon" component={FormHelperText} />
          </FormControl>

          <Button type="submit" variant="contained" sx={{backgroundColor:"#FF0000"}}>
            Create
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

const TaskList = ({ tasks }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task, index) => (
        <li
          key={index}
          style={{
            backgroundImage: 'linear-gradient(#AFEEEE, #E0FFFF )',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '16px',
          }}
        >
          <div style={{fontFamily:"sans-serif", color:'#4169E1', fontWeight:"700", marginBottom: '8px', fontSize: '18px' }}>Task: {task.task}</div>
          <div style={{fontFamily:"sans-serif", color:'#4169E1', fontWeight:"700", fontSize: '16px' }}>Assigned Pokemon: {task.pokemon.name}</div>
        </li>
      ))}
    </ul>
  );
};

const Tasks = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('404 Not found pokemon list:', error);
      }
    };

    fetchPokemon();
  }, []);

  const handleTaskCreation = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);

}

return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems: 'center', padding: '24px', backgroundImage: 'linear-gradient(#1E90FF, #4169E1, #426FF0 )', borderRadius: '50px', maxWidth: '400px', margin:"0 auto", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginTop:"200px"}}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', color: 'white', fontFamily:"sans-serif"}}>
        Create new task!
      </h1>
      <MyForm handleTaskCreation={handleTaskCreation} pokemonList={pokemonList} />
      <h2 style={{textAlign: 'center', marginTop: '32px', fontSize: '20px', color: 'white', fontFamily:"sans-serif" }}>
        Tasks created
      </h2>
      <TaskList tasks={tasks} />
    </Box>
    );};
  
  export default Tasks;

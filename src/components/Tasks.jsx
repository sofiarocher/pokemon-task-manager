import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  task: Yup.string().required(
    <span style={{ fontFamily: 'sans-serif' }}>The task is required.</span>
  ),
  pokemon: Yup.string().required(
    <span style={{ fontFamily: 'sans-serif' }}>Choose a pokemon.</span>
  ),
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

          <Button type="submit" variant="contained" sx={{backgroundColor:"#DC143C"}}>
            Create
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

const TaskList = ({ tasks, handleDeleteTask }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task, index) => (
        <li
          key={index}
          style={{
            backgroundColor: '#4169E1',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '16px',
            position: 'relative',
          }}
        >
          <div style={{fontFamily:"sans-serif", color:'white', fontWeight:"700", marginBottom: '8px', fontSize: '16px', textAlign:"start" }}>Task: {task.task}</div>
          <div style={{fontFamily:"sans-serif", color:'white', fontWeight:"700", fontSize: '16px' }}>Assigned Pokemon: {task.pokemon.name}</div>
          <IconButton
            onClick={() => handleDeleteTask(index)}
            sx={{ color: '#DC143C', position: 'absolute', top: '8px', right: '8px' }}
            aria-label="Delete Task"
          >
            <DeleteOutlineIcon />
          </IconButton>
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

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };
    

return (
    <Box sx={{paddingTop:"200px"}} >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems: 'center', padding: '24px', backgroundColor: 'white', borderRadius: '50px', maxWidth: '400px', margin:"0 auto", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', color: '#696969', fontFamily:"sans-serif"}}>
          Create new task!
        </h1>
        <MyForm handleTaskCreation={handleTaskCreation} pokemonList={pokemonList}  />
        <h2 style={{textAlign: 'center', marginTop: '32px', fontSize: '20px', color: '#696969', fontFamily:"sans-serif" }}>
          Tasks created:
        </h2>
        {tasks.length === 0 ? (
      <p style={{ textAlign: "center", color: "#696969", fontFamily: "sans-serif" }}>
        You didn't create a task yet!
      </p>
    ) : (
      <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
    )}
      </Box>
    </Box>
    );};
  
  export default Tasks;

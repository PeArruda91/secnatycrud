"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Paper, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import postCliente from '../api/postCondutor';




const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#003366', // Azul petróleo
    },
    secondary: {
      main: '#8e44ad', // Lilás
    },
  },
}));

const RegisterCondutor = () => {
  const [formData, setFormData] = useState({
    nome: '',
    numeroHabilitacao: '',
    categoriaHabilitacao: '',
    vencimentoHabilitacao: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postCliente(formData);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Paper sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Número Habilitação"
                  name="numeroHabilitacao"
                  value={formData.numeroHabilitacao}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Categoria"
                  name="categoriaHabilitacao"
                  value={formData.categoriaHabilitacao}
                  onChange={handleChange}
                  margin="normal"
                  select
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label=""
                  name="vencimentoHabilitacao"
                  type="date"
                  value={formData.vencimentoHabilitacao}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Registrar Condutor
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RegisterCondutor;

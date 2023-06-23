"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import postVeiculo from '../api/postVeiculo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Azul petróleo
    },
    secondary: {
      main: '#8e44ad', // Lilás
    },
  },
});

const RegisterVeiculo = () => {
  const [formData, setFormData] = useState({
    placa: '',
    marcaModelo: '',
    anoFabricacao: '',
    kmAtual: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postVeiculo(formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Placa"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Marca/Modelo"
                name="marcaModelo"
                value={formData.marcaModelo}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Ano de Fabricação"
                name="anoFabricacao"
                value={formData.anoFabricacao}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Km Atual"
                name="kmAtual"
                value={formData.kmAtual}
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
  );
};

export default RegisterVeiculo;

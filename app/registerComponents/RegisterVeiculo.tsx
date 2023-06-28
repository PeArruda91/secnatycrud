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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await postVeiculo(formData);
    alert('O Veículo foi registrado');
  };

  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: numericValue,
    }));
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
                onChange={handleNumericInput}
                margin="normal"
                inputProps={{ inputMode: 'numeric' }}
              />
              <TextField
                fullWidth
                label="Km Atual"
                name="kmAtual"
                value={formData.kmAtual}
                onChange={handleNumericInput}
                margin="normal"
                inputProps={{ inputMode: 'numeric' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Registrar Veículo
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterVeiculo;

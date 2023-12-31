import React, { ChangeEvent, useState } from 'react';
import { TextField, Button, Grid, Paper, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import postCliente from '../api/postCliente';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#003366',
    },
    secondary: {
      main: '#8e44ad',
    },
  },
}));

const RegisterClient = () => {
  const [formData, setFormData] = useState({
    numeroDocumento: '',
    tipoDocumento: '',
    nome: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'numeroDocumento' || name === 'numero') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postCliente(formData);
    alert('O Condutor foi registrado com sucesso')
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
                  label="Tipo do Documento"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  margin="normal"
                  select                
                >
                  <MenuItem value ="CPF">CPF</MenuItem>
                  <MenuItem value ="CNH">CNH</MenuItem>
                  <MenuItem value ="RG">RG</MenuItem>
                 </TextField>
                
                 <TextField
                  fullWidth
                  label="Número do Documento"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  margin="normal"
                  inputProps={{ inputMode: 'numeric' }}
                />
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
                  label="Logradouro"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Número"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  inputProps={{ inputMode: 'numeric' }}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  inputProps={{ inputMode: 'text' }}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="UF"
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                  margin="normal"
                />
               

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Registrar Cliente
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RegisterClient;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material/styles';
import postDeslocamento from '../api/postDeslocamento';
import { getCondutores, CondutorData } from '../api/apiCondutor';
import { getVeiculos, VeiculoData } from '../api/apiVeiculo';
import { getClientes, ClienteData } from '../api/apiClientes';



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

const RegisterDeslocamento = () => {
  const [formData, setFormData] = useState({
    kmInicial: '',
    inicioDeslocamento: '',
    checkList: '',
    motivo: '',
    observacao: '',
    idCondutor: '',
    idVeiculo: '',
    idCliente: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postDeslocamento(formData);
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
                  label="kmInicial"
                  name="kmInicial"
                  value={formData.kmInicial}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Inicio Deslocamento"
                  name="inicioDeslocamento"
                  type="datetime-local"
                  value={formData.inicioDeslocamento}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="CheckList"
                  name="checkList"
                  value={formData.checkList}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Motivo"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Observacao"
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="ID Condutor"
                  name="idCondutor"
                  value={formData.idCondutor}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="ID Veiculo"
                  name="idVeiculo"
                  value={formData.idVeiculo}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="ID Cliente"
                  name="idCliente"
                  value={formData.idCliente}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Registrar Deslocamento
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RegisterDeslocamento;

"use client"

import React, { useEffect, useState } from "react";
import { ClienteData, getClientes, deleteCliente } from "../api/apiClientes";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import ModalComponent from "../modalComponents/ModalComponent";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri';

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

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(Number);

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getClientes();
      setClientes(data);
    };

    fetchClientes();
  }, []);

  const handleDeleteCliente = async (id: number) => {
    await deleteCliente(id);
    const updatedClientes = clientes.filter((cliente) => cliente.id !== id);
    setClientes(updatedClientes);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Clientes
            </Typography>
            <Grid container spacing={2}>
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <Grid item xs={12} key={cliente.id}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">ID: {cliente.id}</Typography>
                      <Typography variant="body1">
                        Número do Documento: {cliente.numeroDocumento}
                      </Typography>
                      <Typography variant="body1">
                        Tipo do Documento: {cliente.tipoDocumento}
                      </Typography>
                      <Typography variant="body1">Nome: {cliente.nome}</Typography>
                      <Typography variant="body1">
                        Logradouro: {cliente.logradouro}
                      </Typography>
                      <Typography variant="body1">
                        Número: {cliente.numero}
                      </Typography>
                      <Typography variant="body1">
                        Bairro: {cliente.bairro}
                      </Typography>
                      <Typography variant="body1">
                        Cidade: {cliente.cidade}
                      </Typography>
                      <Typography variant="body1">UF: {cliente.uf}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<RiDeleteBin2Line />}
                        onClick={() => handleDeleteCliente(cliente.id)}
                        sx={{ mt: 2, backgroundColor: 'red' }}
                      >
                        Excluir
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RiEdit2Line />}
                        onClick={() => {
                          setSelectedClientId(cliente.id);
                          setOpenModal(true);
                        }}
                        sx={{ mt: 2, backgroundColor: 'blue', color: 'white' }}
                      >
                        Atualizar
                      </Button>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1">Nenhum cliente encontrado.</Typography>
              )}
            </Grid>
            <ModalComponent
              open={openModal}
              onClose={() => setOpenModal(false)}
              clientId={selectedClientId}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Clientes;

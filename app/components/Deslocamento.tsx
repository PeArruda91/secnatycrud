import React, { useEffect, useState } from "react";
import {
  DeslocamentoData,
  getDeslocamentos
} from "../api/apiDeslocamento";
import ModalDeslocamento from "../modalComponents/ModalDeslocamento";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri';
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";

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

const Deslocamento: React.FC = () => {
  const [deslocamentos, setDeslocamentos] = useState<DeslocamentoData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(Number);


  useEffect(() => {
    const fetchDeslocamentos = async () => {
      const data = await getDeslocamentos();
      setDeslocamentos(data);
    };

    fetchDeslocamentos();
  }, []);

  const handleExcluirDeslocamento = async (id: number) => {
    try {
      // Fazer a requisição DELETE para a API de deslocamento usando o ID do deslocamento
      console.log(`Excluir deslocamento com ID ${id}`);
      // Atualizar a lista de deslocamentos após a exclusão
      const updatedDeslocamentos = deslocamentos.filter(deslocamento => deslocamento.id !== id);
      setDeslocamentos(updatedDeslocamentos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Deslocamentos
            </Typography>
            <Grid container spacing={2}>
              {deslocamentos.length > 0 ? (
                deslocamentos.map((deslocamento) => (
                  <Grid item xs={12} key={deslocamento.id}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">ID: {deslocamento.id}</Typography>
                      <Typography variant="body1">KM Inicial: {deslocamento.kmInicial}</Typography>
                      <Typography variant="body1">KM Final: {deslocamento.kmFinal}</Typography>
                      <Typography variant="body1">Início do Deslocamento: {deslocamento.inicioDeslocamento}</Typography>
                      <Typography variant="body1">Fim do Deslocamento: {deslocamento.fimDeslocamento}</Typography>
                      <Typography variant="body1">Checklist: {deslocamento.checkList}</Typography>
                      <Typography variant="body1">Motivo: {deslocamento.motivo}</Typography>
                      <Typography variant="body1">Observação: {deslocamento.observacao}</Typography>
                      <Typography variant="body1">ID do Condutor: {deslocamento.idCondutor}</Typography>
                      <Typography variant="body1">ID do Veículo: {deslocamento.idVeiculo}</Typography>
                      <Typography variant="body1">ID do Cliente: {deslocamento.idCliente}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<RiDeleteBin2Line />}
                        onClick={() => handleExcluirDeslocamento(deslocamento.id)}
                        sx={{ mt: 2, backgroundColor: 'red' }}
                      >
                        Excluir
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RiEdit2Line />}
                        onClick={() => {
                          setSelectedClientId(deslocamento.id);
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
                <Typography variant="body1">Nenhum deslocamento encontrado.</Typography>
              )}
            </Grid>
            <ModalDeslocamento
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

export default Deslocamento;

import React, { useEffect, useState } from "react";
import {
  CondutorData,
  getCondutores,
  deleteCondutor
} from "../api/apiCondutor";
import ModalCondutor from "../modalComponents/ModalCondutor";
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

const Condutor: React.FC = () => {
  const [condutores, setCondutores] = useState<CondutorData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(Number);

  useEffect(() => {
    const fetchCondutores = async () => {
      const data = await getCondutores();
      setCondutores(data);
    };

    fetchCondutores();
  }, []);

  const handleExcluirCondutor = async (id: number) => {
    try {
      await deleteCondutor(id);
      const data = await getCondutores();
      setCondutores(data);
      console.log("Condutor excluído com sucesso");
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
              Condutores
            </Typography>
            <Grid container spacing={2}>
              {condutores.length > 0 ? (
                condutores.map((condutor) => (
                  <Grid item xs={12} key={condutor.id}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">ID: {condutor.id}</Typography>
                      <Typography variant="body1">Nome: {condutor.nome}</Typography>
                      <Typography variant="body1">
                        Número da Habilitação: {condutor.numeroHabilitacao}
                      </Typography>
                      <Typography variant="body1">
                        Categoria da Habilitação: {condutor.categoriaHabilitacao}
                      </Typography>
                      <Typography variant="body1">
                        Vencimento da Habilitação: {condutor.vencimentoHabilitacao}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<RiDeleteBin2Line />}
                        onClick={() => handleExcluirCondutor(condutor.id)}
                        sx={{ mt: 2, backgroundColor: 'red' }}
                      >
                        Excluir
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RiEdit2Line />}
                        onClick={() => {
                          setSelectedClientId(condutor.id);
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
                <Typography variant="body1">Nenhum condutor encontrado.</Typography>
              )}
            </Grid>
            <ModalCondutor
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

export default Condutor;

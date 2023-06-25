import React, { useEffect, useState } from "react";
import { VeiculoData, getVeiculos, deleteVeiculo } from "../api/apiVeiculo";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri';
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";
import ModalVeiculo from "../modalComponents/ModalVeiculo";

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

const Veiculo: React.FC = () => {
  const [veiculos, setVeiculos] = useState<VeiculoData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(Number);

  useEffect(() => {
    const fetchVeiculos = async () => {
      const data = await getVeiculos();
      setVeiculos(data);
    };

    fetchVeiculos();
  }, []);

  const handleExcluirCondutor = async (id: number) => {
    try {
      await deleteVeiculo(id);
      const data = await getVeiculos();
      setVeiculos(data);
      console.log("Veículo excluído com sucesso");
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
              Veículos
            </Typography>
            <Grid container spacing={2}>
              {veiculos.length > 0 ? (
                veiculos.map((veiculo) => (
                  <Grid item xs={12} key={veiculo.id}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body1">ID: {veiculo.id}</Typography>
                      <Typography variant="body1">Placa: {veiculo.placa}</Typography>
                      <Typography variant="body1">
                        Marca/Modelo: {veiculo.marcaModelo}
                      </Typography>
                      <Typography variant="body1">
                        Ano de Fabricação: {veiculo.anoFabricacao}
                      </Typography>
                      <Typography variant="body1">
                        KM Atual: {veiculo.kmAtual}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<RiDeleteBin2Line />}
                        onClick={() => handleExcluirCondutor(veiculo.id)}
                        sx={{ mt: 2, backgroundColor: 'red' }}
                      >
                        Excluir
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RiEdit2Line />}
                        onClick={() => {
                          setSelectedClientId(veiculo.id);
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
                <Typography variant="body1">Nenhum veículo encontrado.</Typography>
              )}
            </Grid>
            <ModalVeiculo
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

export default Veiculo;

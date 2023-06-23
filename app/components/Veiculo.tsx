import React, { useEffect, useState } from "react";
import { VeiculoData, getVeiculos, deleteVeiculo } from "../api/apiVeiculo";
import { Box, Container, Typography, makeStyles, createStyles, Theme, Button } from "@mui/material";
import ModalVeiculo from "../modalComponents/ModalVeiculo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.background.default,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      background: theme.palette.background.paper,
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
    },
  })
);

const Veiculo: React.FC = () => {
  const classes = useStyles();
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
      // Atualiza a lista de condutores após a exclusão
      const data = await getVeiculos();
      setVeiculos(data);
      console.log("Condutor excluído com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.content}>
        <Typography variant="h4" align="center" gutterBottom>
          Veículos
        </Typography>
        {veiculos.length > 0 ? (
          veiculos.map((veiculo) => (
            <div key={veiculo.id}>
              <Typography variant="body1">ID: {veiculo.id}</Typography>
              <Typography variant="body1">Placa: {veiculo.placa}</Typography>
              <Typography variant="body1">Marca/Modelo: {veiculo.marcaModelo}</Typography>
              <Typography variant="body1">Ano de Fabricação: {veiculo.anoFabricacao}</Typography>
              <Typography variant="body1">KM Atual: {veiculo.kmAtual}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleExcluirCondutor(veiculo.id)}
              >
                Excluir
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedClientId(veiculo.id);
                  setOpenModal(true);
                }}
              >
                Atualizar
              </Button>
              <br />
            </div>
          ))
        ) : (
          <Typography variant="body1">Nenhum veículo encontrado.</Typography>
        )}
        <ModalVeiculo open={openModal}
          onClose={() => setOpenModal(false)}
          clientId={selectedClientId} />
      </Box>
    </Container>
  );
};

export default Veiculo;

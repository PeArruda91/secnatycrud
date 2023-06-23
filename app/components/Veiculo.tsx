import React, { useEffect, useState } from "react";
import { VeiculoData, getVeiculos, deleteVeiculo } from "../api/apiVeiculo";
import { Box, Container, Typography, Button } from "@mui/material";
import ModalVeiculo from "../modalComponents/ModalVeiculo";

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
    <Container>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Veículos
        </Typography>
        {veiculos.length > 0 ? (
          veiculos.map((veiculo) => (
            <div key={veiculo.id}>
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
        <ModalVeiculo
          open={openModal}
          onClose={() => setOpenModal(false)}
          clientId={selectedClientId}
        />
      </Box>
    </Container>
  );
};

export default Veiculo;

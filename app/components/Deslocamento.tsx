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
  Button
} from "@mui/material";

const Deslocamento: React.FC = () => {
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
    <Container>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Condutores
        </Typography>
        {condutores.length > 0 ? (
          condutores.map((condutor) => (
            <div key={condutor.id}>
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
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleExcluirCondutor(condutor.id)}
              >
                Excluir
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={() => {
                  setSelectedClientId(condutor.id);
                  setOpenModal(true);
                }}
              >
                Atualizar
              </Button>
              <br />
            </div>
          ))
        ) : (
          <Typography variant="body1">Nenhum condutor encontrado.</Typography>
        )}
        <ModalCondutor
          open={openModal}
          onClose={() => setOpenModal(false)}
          clientId={selectedClientId}
        />
      </Box>
    </Container>
  );
};

export default Deslocamento;

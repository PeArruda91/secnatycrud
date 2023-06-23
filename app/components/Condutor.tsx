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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button
} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.background.default,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      background: theme.palette.background.paper,
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius
    }
  })
);

const Condutor: React.FC = () => {
  const classes = useStyles();
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
      // Atualiza a lista de condutores após a exclusão
      const data = await getCondutores();
      setCondutores(data);
      console.log("Condutor excluído com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.content}>
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
                onClick={() => handleExcluirCondutor(condutor.id)}
              >
                Excluir
              </Button>
              <Button
                variant="contained"
                color="primary"
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

export default Condutor;

"use client"

import React, { useEffect, useState } from "react";
import { DeslocamentoData, getDeslocamentos } from "../api/apiDeslocamento";
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
} from "@mui/material";

interface DeslocamentoProps {
  id: number;
}

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
    select: {
      minWidth: 200,
    },
  })
);

const Deslocamento: React.FC<DeslocamentoProps> = ({ id }) => {
  const classes = useStyles();
  const [deslocamento, setDeslocamento] = useState<DeslocamentoData | null>(
    null
  );
  const [deslocamentos, setDeslocamentos] = useState<DeslocamentoData[]>([]);

  useEffect(() => {
    const fetchDeslocamentos = async () => {
      const data = await getDeslocamentos();
      setDeslocamentos(data);
      const selected = data.find((item) => item.id === id);
      setDeslocamento(selected || null);
    };

    fetchDeslocamentos();
  }, [id]);

  const handleSelectChange = (event: React.ChangeEvent<{ value: number }>) => {
    const selected = deslocamentos.find((item) => item.id === event.target.value);
    setDeslocamento(selected || null);
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.content}>
        <Typography variant="h4" align="center" gutterBottom>
          Deslocamento
        </Typography>
        <FormControl className={classes.select}>
          <InputLabel>ID</InputLabel>
          <Select value={id} onChange={handleSelectChange} fullWidth>
            {deslocamentos.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {deslocamento ? (
          <div>
            <Typography variant="body1">
              ID: {deslocamento.id}
            </Typography>
            <Typography variant="body1">
              Km Inicial: {deslocamento.kmInicial}
            </Typography>
            <Typography variant="body1">
              Km Final: {deslocamento.kmFinal || "N/A"}
            </Typography>
            <Typography variant="body1">
              Início do Deslocamento: {deslocamento.inicioDeslocamento}
            </Typography>
            <Typography variant="body1">
              Fim do Deslocamento: {deslocamento.fimDeslocamento || "N/A"}
            </Typography>
            <Typography variant="body1">
              Checklist: {deslocamento.checkList}
            </Typography>
            <Typography variant="body1">
              Motivo: {deslocamento.motivo}
            </Typography>
            <Typography variant="body1">
              Observação: {deslocamento.observacao}
            </Typography>
            <Typography variant="body1">
              ID do Condutor: {deslocamento.idCondutor}
            </Typography>
            <Typography variant="body1">
              ID do Veículo: {deslocamento.idVeiculo}
            </Typography>
            <Typography variant="body1">
              ID do Cliente: {deslocamento.idCliente}
            </Typography>
          </div>
        ) : (
          <Typography variant="body1">Deslocamento não encontrado.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Deslocamento;

"use client"

import React, { useEffect, useState } from "react";
import { ClienteData, getClientes, deleteCliente } from "../api/apiClientes";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import ModalComponent from "../modalComponents/ModalComponent";

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
    <Container>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Clientes
        </Typography>
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <div key={cliente.id}>
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
                onClick={() => handleDeleteCliente(cliente.id)}
              >
                Excluir
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedClientId(cliente.id);
                  setOpenModal(true);
                }}
              >
                Atualizar
              </Button>
              <br />
            </div>
          ))
        ) : (
          <Typography variant="body1">Nenhum cliente encontrado.</Typography>
        )}
        <ModalComponent
          open={openModal}
          onClose={() => setOpenModal(false)}
          clientId={selectedClientId}
        />
      </Box>
    </Container>
  );
};

export default Clientes;

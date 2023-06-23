"use client"

import React, { useEffect, useState, ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  clientId: number;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, clientId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientData, setClientData] = useState<any>(null);
  const [editedData, setEditedData] = useState<any>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const options = {
      method: "PUT",
      url: `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${clientId}`,
      headers: { "Content-Type": "application/json" },
      data: { id: clientId, ...editedData },
    };

    try {
      console.log("Sending PUT request:", options);
      const response = await axios.request(options);
      console.log("PUT response:", response.data);
      setClientData(response.data);
    } catch (error) {
      console.error("PUT error:", error);
    }
  };

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${clientId}`);
        setClientData(response.data);
        setEditedData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      setIsLoading(true);
      fetchClientData();
    }
  }, [open, clientId]);

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            {clientData ? (
              <>
                <Typography variant="h6">Dados</Typography>
                <div style={{ marginBottom: 16 }}>
                  <TextField
                    name="nome"
                    label="Name"
                    value={editedData.nome || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <TextField
                    name="logradouro"
                    label="Address"
                    value={editedData.logradouro || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <TextField
                    name="logradouro"
                    label="Numero"
                    value={editedData.numero || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <TextField
                    name="numero"
                    label="Bairro"
                    value={editedData.bairro || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <TextField
                    name="logradouro"
                    label="Cidade"
                    value={editedData.cidade || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <TextField
                    name="logradouro"
                    label="UF"
                    value={editedData.uf || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                {/* Add more fields as needed */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Atualizar
                  </Button>
                </div>
              </>
            ) : (
              <Typography variant="body1">Cliente atualizado com sucesso.</Typography>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;

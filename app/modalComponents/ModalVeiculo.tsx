"use client"

import React, { useEffect, useState } from "react";
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

const ModalVeiculo: React.FC<ModalComponentProps> = ({ open, onClose, clientId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientData, setClientData] = useState<any>(null);
  const [editedData, setEditedData] = useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const options = {
      method: "PUT",
      url: `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${clientId}`,
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
        const response = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${clientId}`);
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
    <Modal open={open} onClose={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: "#ffffff", // White background color
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {clientData ? (
              <>
                <Typography variant="h6">Dados</Typography>
                <div style={{ marginBottom: 16, width: "100%" }}>
                  <TextField
                    name="marcaModelo"
                    label="Modelo"
                    value={editedData.marcaModelo || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16, width: "100%" }}>
                  <TextField
                    name="anoFabricacao"
                    label="Ano de fabricação."
                    value={editedData.anoFabricacao || ""}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric' }}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16, width: "100%" }}>
                  <TextField
                    name="kmAtual"
                    label="Kilometragem total atual."
                    value={editedData.kmAtual || ""}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric' }}
                    fullWidth
                  />
                </div>
                <div>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Atualizar
                  </Button>
                </div>
              </>
            ) : (
              <Typography variant="body1">Veicuto atualizado com sucesso. Por favor atualizar a página</Typography>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalVeiculo;

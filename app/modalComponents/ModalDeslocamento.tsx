"use client"

import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { format } from "date-fns";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  clientId: number;
}

const ModalDeslocamento: React.FC<ModalComponentProps> = ({ open, onClose, clientId }) => {
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
      url: `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${clientId}/EncerrarDeslocamento`,
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
        const response = await axios.get(`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${clientId}`);
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
                    name="kmFinal"
                    label="Km Final"
                    value={editedData.kmFinal || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16, width: "100%" }}>
                  <TextField
                    name="fimDeslocamento"
                    label="Final do Deslocamento"
                    value={editedData.fimDeslocamento || ""}
                    type="datetime-local"
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 16, width: "100%" }}>
                  <TextField
                    name="observacao"
                    label="Observação"
                    value={editedData.observacao || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Atualizar
                  </Button>
                </div>
              </>
            ) : (
              <Typography variant="body1">
                Condutor atualizado com sucesso em: {format(new Date(), "dd/MM/yyyy HH:mm")}
              </Typography>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalDeslocamento;

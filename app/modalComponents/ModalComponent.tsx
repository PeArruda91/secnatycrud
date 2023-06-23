"use client"

import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: theme.spacing(1),
    maxWidth: 400,
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  fieldContainer: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
}));

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  clientId: number;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, clientId }) => {
  const classes = useStyles();
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
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {clientData ? (
              <>
                <Typography variant="h6">Dados</Typography>
                <div className={classes.fieldContainer}>
                  <TextField
                    name="nome"
                    label="Name"
                    value={editedData.nome || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className={classes.fieldContainer}>
                  <TextField
                    name="logradouro"
                    label="Address"
                    value={editedData.logradouro || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className={classes.fieldContainer}>
                  <TextField
                    name="logradouro"
                    label="Numero"
                    value={editedData.numero || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className={classes.fieldContainer}>
                  <TextField
                    name="numero"
                    label="Bairro"
                    value={editedData.bairro || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className={classes.fieldContainer}>
                  <TextField
                    name="logradouro"
                    label="Cidade"
                    value={editedData.cidade || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className={classes.fieldContainer}>
                  <TextField
                    name="logradouro"
                    label="UF"
                    value={editedData.uf || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                {/* Add more fields as needed */}
                <div className={classes.buttonContainer}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Atualizar
                  </Button>
                </div>
              </>
            ) : (
              <Typography variant="body1"> Cliente atualizado com sucesso.</Typography>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;

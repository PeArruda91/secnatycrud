"use client"

import React, { useState } from "react";
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
  AppBar,
  Tabs,
  Tab,
} from "@mui/material";
import Deslocamento from "./components/Deslocamento";
import Clientes from "./components/Clientes";
import Condutor from "./components/Condutor";
import Veiculo from "./components/Veiculo";
import RegisterClient from "./components/RegisterClient";
import RegisterCondutor from "./components/RegisterCondutor";
import RegisterVeiculo from "./components/RegisterVeiculo";

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
      marginBottom: theme.spacing(2),
    },
    appBar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [selectedComponent, setSelectedComponent] = useState<
    "deslocamento" | "clientes" | "condutor" | "veiculo"
  >("deslocamento");
  const [activeTab, setActiveTab] = useState(0);

  const handleComponentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedComponent(
      event.target.value as "deslocamento" | "clientes" | "condutor" | "veiculo"
    );
  };

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Verificar Dados" />
            <Tab label="Criar Dados" />
          </Tabs>
        </div>

      </AppBar>
      <Container className={classes.container}>
        <Box className={classes.content}>
          {activeTab === 0 ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Verificar Dados
              </Typography>
              <FormControl variant="outlined" fullWidth className={classes.select}>
                <InputLabel id="component-select-label">Busca</InputLabel>
                <Select
                  labelId="component-select-label"
                  id="component-select"
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  label="Componente"
                >
                  <MenuItem value="deslocamento">Deslocamento</MenuItem>
                  <MenuItem value="clientes">Clientes</MenuItem>
                  <MenuItem value="condutor">Condutor</MenuItem>
                  <MenuItem value="veiculo">Veículo</MenuItem>
                </Select>
              </FormControl>
              {selectedComponent === "deslocamento" ? (
                <Deslocamento id={0} />
              ) : selectedComponent === "clientes" ? (
                <Clientes />
              ) : selectedComponent === "condutor" ? (
                <Condutor />
              ) : (
                <Veiculo />
              )}
            </>
          ) : (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Criar Dados
              </Typography>
              <FormControl variant="outlined" fullWidth className={classes.select}>
                <InputLabel id="create-select-label">Tipo de Dado</InputLabel>
                <Select
                  labelId="create-select-label"
                  id="create-select"
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  label="Tipo de Dado"
                >
                  <MenuItem value="clientes">Cliente</MenuItem>
                  <MenuItem value="condutor">Condutor</MenuItem>
                  <MenuItem value="veiculo">Veículo</MenuItem>
                  <MenuItem value="deslocamento">Deslocamento</MenuItem>
                </Select>
              </FormControl>
              {selectedComponent === "clientes" ? (
                <RegisterClient />
              ) : selectedComponent === "condutor" ? (
                <RegisterCondutor />
              ) : selectedComponent === "veiculo" && (
                <RegisterVeiculo />
              )}
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default App;

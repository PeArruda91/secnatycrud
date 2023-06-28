"use client"

import React, { ReactNode, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  AppBar,
  Tabs,
  Tab,
  SelectChangeEvent,
} from "@mui/material";
import Deslocamento from "./components/Deslocamento";
import Clientes from "./components/Clientes";
import Condutor from "./components/Condutor";
import Veiculo from "./components/Veiculo";
import RegisterClient from "./registerComponents/RegisterClient"
import RegisterCondutor from "./registerComponents/RegisterCondutor";
import RegisterVeiculo from "./registerComponents/RegisterVeiculo";
import RegisterDeslocamento from "./registerComponents/RegisterDeslocamento";
import { Icon } from "@mui/material";
import { FaDesktop, FaPen } from "react-icons/fa";

const containerStyle: React.CSSProperties = {
  background: "default",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  background: "paper",
  padding: "24px",
  borderRadius: "4px",
};

const selectStyle: React.CSSProperties = {
  marginBottom: "16px",
};

const appBarStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(to right, #2C3E50, #9B59B6)",
};

const tabLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  color: "#fff",
};

const selectedTabLabelStyle: React.CSSProperties = {
  ...tabLabelStyle,
  color: "carmin",
};

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<
    "deslocamento" | "clientes" | "condutor" | "veiculo"
  >("deslocamento");
  const [activeTab, setActiveTab] = useState(0);

  const handleComponentChange = (
    event: SelectChangeEvent<"clientes" | "deslocamento" | "condutor" | "veiculo">,
    child: ReactNode
  ) => {
    setSelectedComponent(
      event.target.value as "deslocamento" | "clientes" | "condutor" | "veiculo"
    );
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" style={appBarStyle}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab
              label={
                <div
                  style={activeTab === 0 ? selectedTabLabelStyle : tabLabelStyle}
                >
                  <Icon>
                    <FaDesktop />
                  </Icon>
                  <span style={{ marginLeft: "8px" }}>Verificar Dados</span>
                </div>
              }
            />
            <Tab
              label={
                <div
                  style={activeTab === 1 ? selectedTabLabelStyle : tabLabelStyle}
                >
                  <Icon>
                    <FaPen />
                  </Icon>
                  <span style={{ marginLeft: "8px" }}>Criar Dados</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </AppBar>
      <Container style={containerStyle}>
        <Box style={contentStyle}>
          {activeTab === 0 ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Verificar Dados
              </Typography>
              <FormControl variant="outlined" fullWidth style={selectStyle}>
                <InputLabel id="component-select-label">Busca</InputLabel>
                <Select
                  labelId="component-select-label"
                  id="component-select"
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  label="Componente"
                  style={activeTab === 0 ? {} : { color: "carmin" }}
                >
                  <MenuItem value="deslocamento">Deslocamento</MenuItem>
                  <MenuItem value="clientes">Clientes</MenuItem>
                  <MenuItem value="condutor">Condutor</MenuItem>
                  <MenuItem value="veiculo">Veículo</MenuItem>
                </Select>
              </FormControl>
              {selectedComponent === "deslocamento" ? (
                <Deslocamento />
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
              <FormControl variant="outlined" fullWidth style={selectStyle}>
                <InputLabel id="create-select-label">Tipo de Dado</InputLabel>
                <Select
                  labelId="create-select-label"
                  id="create-select"
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  label="Tipo de Dado"
                  style={activeTab === 1 ? {} : { color: "carmin" }}
                >
                  <MenuItem value="clientes">Cliente</MenuItem>
                  <MenuItem value="condutor">Condutor</MenuItem>
                  <MenuItem value="veiculo">Veículo</MenuItem>
                  <MenuItem value="deslocamento">Deslocamento</MenuItem>
                </Select>
              </FormControl>
              {selectedComponent === "deslocamento" ? (
                <RegisterDeslocamento />
              ) : selectedComponent === "clientes" ? (
                <RegisterClient />
              ) : selectedComponent === "condutor" ? (
                <RegisterCondutor />
              ) : (
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

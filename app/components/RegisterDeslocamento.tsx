import React, { useState, ChangeEvent, FormEvent, useEffect, ChangeEventHandler } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import postDeslocamento from '../api/postDeslocamento';
import { getCondutores, CondutorData } from '../api/apiCondutor';
import { getVeiculos, VeiculoData } from '../api/apiVeiculo';
import { getClientes, ClienteData } from '../api/apiClientes';

const RegisterDeslocamento: React.FC = () => {
  const [formData, setFormData] = useState({
    kmInicial: '',
    inicioDeslocamento: '',
    checkList: '',
    motivo: '',
    observacao: '',
    idCondutor: '',
    idVeiculo: '',
    idCliente: '',
  });

  const [condutores, setCondutores] = useState<CondutorData[]>([]);
  const [veiculos, setVeiculos] = useState<VeiculoData[]>([]);
  const [clientes, setClientes] = useState<ClienteData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCondutores: CondutorData[] = await getCondutores();
        const fetchedVeiculos: VeiculoData[] = await getVeiculos();
        const fetchedClientes: ClienteData[] = await getClientes();

        setCondutores(fetchedCondutores);
        setVeiculos(fetchedVeiculos);
        setClientes(fetchedClientes);

        if (fetchedCondutores.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            idCondutor: String(fetchedCondutores[0].id),
          }));
        }

        if (fetchedVeiculos.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            idVeiculo: String(fetchedVeiculos[0].id),
          }));
        }

        if (fetchedClientes.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            idCliente: String(fetchedClientes[0].id),
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange : ChangeEventHandler  = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postDeslocamento(formData);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="kmInicial"
              name="kmInicial"
              value={formData.kmInicial}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Inicio Deslocamento"
              name="inicioDeslocamento"
              type="datetime-local"
              value={formData.inicioDeslocamento}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="CheckList"
              name="checkList"
              value={formData.checkList}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Observacao"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              margin="normal"
            />

            {/* Caixa seletora para idCondutor */}
            <label htmlFor="idCondutor">ID Condutor:</label>
            <select
              name="idCondutor"
              value={formData.idCondutor}
              onChange={handleChange}
              style={{ display: 'block' }}
            >
              {condutores.map((condutor) => (
                <option key={condutor.id} value={condutor.id}>
                  {condutor.id}
                </option>
              ))}
            </select>

            {/* Caixa seletora para idVeiculo */}
            <label htmlFor="idVeiculo">ID Veiculo:</label>
            <select
              name="idVeiculo"
              value={formData.idVeiculo}
              onChange={handleChange}
              style={{ display: 'block' }}
            >
              {veiculos.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.id}
                </option>
              ))}
            </select>

            {/* Caixa seletora para idCliente */}
            <label htmlFor="idCliente">ID Cliente:</label>
            <select
              name="idCliente"
              value={formData.idCliente}
              onChange={handleChange}
              style={{ display: 'block' }}
            >
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.id}
                </option>
              ))}
            </select>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Registrar Deslocamento
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterDeslocamento;

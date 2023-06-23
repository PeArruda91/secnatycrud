import axios from "axios";

export interface VeiculoData {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export const getVeiculos = async (): Promise<VeiculoData[]> => {
  try {
    const response = await axios.get<VeiculoData[]>(
      "https://api-deslocamento.herokuapp.com/api/v1/Veiculo"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteVeiculo = async (id: number): Promise<void> => {
  try {
    const options = {
      method: 'DELETE',
      url: `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`,
      headers: {'Content-Type': 'application/json'},
      data: {id: id}
    };
    await axios.request(options);
    console.log("Veiculo excluído com sucesso");
  } catch (error) {
    console.error(error);
  }
};
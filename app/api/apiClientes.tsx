import axios from "axios";

export interface ClienteData {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export const getClientes = async (): Promise<ClienteData[]> => {
  try {
    const response = await axios.get<ClienteData[]>(
      "https://api-deslocamento.herokuapp.com/api/v1/Cliente"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteCliente = async (id: number): Promise<void> => {
  try {
    const options = {
      method: 'DELETE',
      url: `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
      headers: {'Content-Type': 'application/json'},
      data: {id: id}
    };
    await axios.request(options);
    console.log("Cliente excluído com sucesso");
  } catch (error) {
    console.error(error);
  }
};
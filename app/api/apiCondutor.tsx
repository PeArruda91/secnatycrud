import axios from "axios";

export interface CondutorData {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export const getCondutores = async (): Promise<CondutorData[]> => {
  try {
    const response = await axios.get<CondutorData[]>(
      "https://api-deslocamento.herokuapp.com/api/v1/Condutor"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteCondutor = async (id: number): Promise<void> => {
  try {
    const options = {
      method: 'DELETE',
      url: `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
      headers: {'Content-Type': 'application/json'},
      data: {id: id}
    };
    await axios.request(options);
    console.log("Cliente excluído com sucesso");
  } catch (error) {
    console.error(error);
  }
};
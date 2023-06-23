import axios from "axios";

export interface DeslocamentoData {
  id: number;
  kmInicial: number;
  kmFinal: number | null;
  inicioDeslocamento: string;
  fimDeslocamento: string | null;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export const getDeslocamentos = async (): Promise<DeslocamentoData[]> => {
  try {
    const response = await axios.get<DeslocamentoData[]>(
      "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

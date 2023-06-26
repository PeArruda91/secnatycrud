import axios from "axios";

const postDeslocamento = (formData: {
    kmInicial: string;
    inicioDeslocamento: string;
    checkList: string;
    motivo: string;
    observacao: string;
    idCondutor: string;
    idVeiculo: string;
    idCliente: string;
}) => {
  const options = {
    method: 'POST',
    url: 'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento',
    headers: { 'Content-Type': 'application/json' },
    data: formData
  };

  axios.request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default postDeslocamento;

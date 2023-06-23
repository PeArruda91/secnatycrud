import axios from "axios";

const postVeiculo = (formData: {
    placa: string;
    marcaModelo: string;
    anoFabricacao: string;
    kmAtual: string;
}) => {
  const options = {
    method: 'POST',
    url: 'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
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

export default postVeiculo;

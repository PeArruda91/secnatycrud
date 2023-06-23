import axios from "axios";

const postCliente = (formData: { numeroDocumento: string; tipoDocumento: string; nome: string; logradouro: string; numero: string; bairro: string; cidade: string; uf: string; }) => {
  const options = {
    method: 'POST',
    url: 'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
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

export default postCliente;
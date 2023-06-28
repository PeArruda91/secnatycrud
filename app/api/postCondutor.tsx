import axios from "axios";

const postCondutor = (formData: {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}) => {
  const options = {
    method: 'POST',
    url: 'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
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

export default postCondutor;

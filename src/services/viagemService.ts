import axios from 'axios';

const API_URL = 'https://carona-spring.onrender.com/viagens';

export const buscarViagens = async () => {
  const resposta = await axios.get(API_URL);
  return resposta.data;
};

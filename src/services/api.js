import axios from'axios';

const api =axios.create({baseURL:'https://catalogo-sandalias-backend.herokuapp.com/'});

export default api;
export interface User {
  idLogin?: number,
  pessoa: Pessoa,
  login: string,
  senha: string,
  confirmarSenha?: string,
  email: string,
  caminhoFoto?: string,
  inativo?: boolean,
}
export interface Pessoa {
  idPessoa?: number,
  nome: string,
  cpf: string,
  dtNascimento: string,
  sexo: string,
  celular: string,
  telefone: string
}

export interface Endereco {
  idEndereco?: number,
  cep: string ,
  logradouro: string ,
  numero: string ,
  bairro: string ,
  cidade: string ,
  uf: string,
  complemento?: string,
}

export interface UserAuthLogin {
  username: string;
  password: string;
  jwtToken?: string;
}
export interface User {
  idLogin: number,
  pessoa: Pessoa,
  login: string,
  senha: string,
  email: string,
  caminhoFoto: string,
  inativo: boolean,
}
interface Pessoa {
  idPessoa: number,
  nome: string,
  cpf: string,
  dtNascimento: string,
  sexo: string,
  celular: string,
  telefone: string
}
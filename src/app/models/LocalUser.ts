// Interface para definir o modelo de dados de localUser (dados do usuário logado)
export interface LocalUser {
  token: string;
  login: string;
}
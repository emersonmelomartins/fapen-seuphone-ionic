export interface Product {
  idProduto: string,
  tipoProduto: string,
  modelo: string,
  valor: number,
  peso: string,
  cor: string,
  descricao: string,
  quantidadeEstoque: number,
  caminhoFoto: string,
  fotoEmString: string,
  fornecedor: Provider,
  inativo: boolean,
}

export interface Provider {
    id: number
    razaoSocial: string,
    cnpj: string,
    tel: string,
    email: string
    categoriaProduto: string,
    inativo: false,
    endereco: Address,
}

export interface Address {
  id: number,
  uf: string,
  cidade: string,
  logradouro: string,
  bairro: string,
  cep: string,
  complemento: string,
  numero: number
}
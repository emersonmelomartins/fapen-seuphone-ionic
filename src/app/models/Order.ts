import { Cart } from './Cart';
import { CartItem } from './CartItem';
import { User } from './User';

export interface Order {
  cart: Cart,
  condicao_pagamento: number;
  valor_total: number;
  data_pedido: string;
  data_entrega: string;
  situacao_pedido: string;
  tempo_contrato: number;
  id_login: number;
  endereco: string;
}

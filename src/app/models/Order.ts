import { Cart } from './Cart';
import { CartItem } from './CartItem';
import { User } from './User';

export interface Order {
  cart: Cart,
  condicaoPagamento: string;
  valorFinal: number;
  dtPedidoVenda: string;
  dtEntregaVenda: string;
  situacaoPedidoVenda: string;
  tempoContrato: number;
  usuario: any;
}

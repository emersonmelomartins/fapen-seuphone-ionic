import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { STORAGE_KEYS } from 'src/app/config/storage_keys.config';
import { CartItem } from "src/app/models/CartItem";
import { Order } from "src/app/models/Order";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from "src/app/services/cart.service";
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: "app-confirm-order",
  templateUrl: "./confirm-order.page.html",
  styleUrls: ["./confirm-order.page.scss"],
})
export class ConfirmOrderPage implements OnInit {
  public formGroup: FormGroup;

  public condicaoPagamentoOptions = [
    {
      label: "Cartão Cred.",
      value: 1,
    },
    {
      label: "Boleto",
      value: 2,
    },
  ];

  userInfo: any;

  public selectedOption: number;

  public itens: CartItem[];

  public order = {
    pedidoVenda: {
      condicaoPagamento: "CARTAO_CREDITO",
      valorFinal: this.total(),
      dtPedidoVenda: new Date(),
      dtEntregaVenda: new Date(),
      situacaoPedidoVenda: "AGUARDANDO",
      tempoContrato: 0,
      usuario: {}
    },
    itensPedidoVenda: this.cartService.getCart().itens
  };

  constructor(
    public cartService: CartService,
    public nav: NavController,
    public formBuilder: FormBuilder,
    public storage: StorageService,
    public usersService: UsersService,
    public authService: AuthService,
    public orderService: OrderService,
    
  ) {
    this.formGroup = formBuilder.group({
      condicaoRadioOption: [
        this.order.pedidoVenda.condicaoPagamento,
        Validators.compose([Validators.required]),
      ],
      contratoSelect: [
        this.order.pedidoVenda.tempoContrato,
        Validators.compose([Validators.required]),
      ],
    });
  }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();

    this.itens = cart.itens;

    this.cartService.checkCart(cart);
  }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.login) {
        this.authService.findByLogin(localUser.login).subscribe(resp => {
          this.order.pedidoVenda.usuario = resp;
        });
    }
  }

  total(): number {
    return this.cartService.total();
  }

  goBack() {
    this.nav.back();
  }

  condicaoPagamentoRadioChange(event) {
    this.order.pedidoVenda.condicaoPagamento = event.target.value;
  }
  tempoContratoSelectChange(event) {
    this.order.pedidoVenda.tempoContrato = event.target.value;
  }

  orderTest() {
    this.orderService.createOrder(this.order).subscribe(resp => {
      alert("Pedido realizado com sucesso!");
      localStorage.removeItem(STORAGE_KEYS.localCart);
      this.nav.navigateRoot("home");
    },
    (error) => {
      alert("Ocorreu um erro!");
    });
  }
}

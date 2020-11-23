import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, ToastController } from "@ionic/angular";
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
      value: "CARTAO_CREDITO",
    },
    {
      label: "Boleto",
      value: "BOLETO",
    },
  ];

  public parcelas = [
    {
      numeroParcelas: 12,
      valorParcelas: (this.total()/12).toFixed(2),
    },
    {
      numeroParcelas: 24,
      valorParcelas: (this.total()/24).toFixed(2),
    }
  ]

  userInfo: any;

  userAddress: string;

  public selectedOption: number;

  public itens: CartItem[];

  public date = new Date();
  public newDate = this.addDays(this.date, 20);

  public order = {
    pedidoVenda: {
      condicaoPagamento: "",
      valorFinal: this.total(),
      dtPedidoVenda: this.date,
      dtEntregaVenda: this.newDate,
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
    public toastController: ToastController
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

  ionViewWillEnter() {
    if(this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    }
   }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();

    this.itens = cart.itens;

    this.cartService.checkCart(cart);
  }

   addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.login) {
        this.authService.findByLogin(localUser.login).subscribe(resp => {
          this.userAddress = `${resp.pessoa.endereco.logradouro} - ${resp.pessoa.endereco.bairro} - ${resp.pessoa.endereco.cidade}/${resp.pessoa.endereco.uf} - ${resp.pessoa.endereco.cep}`;

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

  async errorToast(message) {
    const toast = await this.toastController.create({
      color: 'danger',
      position: 'top',
      header: 'ERROR!',
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async successToast(message) {
    const toast = await this.toastController.create({
      color: 'success',
      position: 'top',
      header: 'SUCESSO!',
      message: message,
      duration: 3000
    });
    toast.present();
  }

  createOrder() {
    this.orderService.createOrder(this.order).subscribe(resp => {
      localStorage.removeItem(STORAGE_KEYS.localCart);
      this.nav.navigateRoot("order-success");
    },
    (error) => {
      this.errorToast("Ocorreu um erro!");
    });
  }
}

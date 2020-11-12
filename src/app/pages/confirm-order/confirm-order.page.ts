import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { CartItem } from "src/app/models/CartItem";
import { Order } from "src/app/models/Order";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-confirm-order",
  templateUrl: "./confirm-order.page.html",
  styleUrls: ["./confirm-order.page.scss"],
})
export class ConfirmOrderPage {
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

  public selectedOption: number;

  public itens: CartItem[];

  public order: Order = {
    cart: this.cartService.getCart(),
    condicao_pagamento: 0,
    valor_total: this.total(),
    data_pedido: new Date().toLocaleDateString(),
    data_entrega: new Date().toLocaleDateString(),
    situacao_pedido: "Aguardando Entrega",
    tempo_contrato: 0,
    id_login: 1,
    endereco: "Testando endereço de usuário, aqui vai puxar do usuario",
  };

  constructor(
    public cartService: CartService,
    public nav: NavController,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      condicaoRadioOption: [
        this.order.condicao_pagamento,
        Validators.compose([Validators.required]),
      ],
      contratoSelect: [
        this.order.tempo_contrato,
        Validators.compose([Validators.required]),
      ],
    });
  }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();

    this.itens = cart.itens;

    this.cartService.checkCart(cart);
  }

  total(): number {
    return this.cartService.total();
  }

  goBack() {
    this.nav.back();
  }

  condicaoPagamentoRadioChange(event) {
    this.order.condicao_pagamento = event.target.value;
  }
  tempoContratoSelectChange(event) {
    this.order.tempo_contrato = event.target.value;
  }

  orderTest() {
    console.log(this.order);
  }
}

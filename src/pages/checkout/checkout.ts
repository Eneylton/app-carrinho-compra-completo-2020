import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  total: any;
  nome: string = "";
  id: any;
  valor: any;
  produtos_id: any;
  qtd: any;
  items: Array<any> = [];

  dataFormat: any;

  totalAB:number=0;
  qtd_produto:number=0;
  qtd_pedidos:number=0;
  qtd_total:number=0;
  totalPR:number=0;

  pedidos: any = [];
  produtos: any = [];

  constructor(public navCtrl: NavController,
    private serve: ServiceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams, public cart: CartProvider) {
  }


  ionViewDidLoad() {
    this.pedidos = [];
    this.produtos = [];
    this.listarPedidos();
    this.listarProdutos();
  }


  listarProdutos() {

    let body = {

      crud: 'listar-produtos-atualizar'
    }

    this.serve.postData(body, 'produtos.php').subscribe((data: any) => {

      for (let i = 0; i < data.result.length; i++) {
        
        this.produtos.push({

          id: data.result[i]["id"],
          qtd: data.result[i]["qtd"]

        })

        this.qtd_produto = data.result[i]["qtd"];

      }

    })


  }


  listarPedidos() {


    let body = {

      crud: 'listar-pedidos'
    }

    this.serve.postData(body, 'produtos.php').subscribe((data: any) => {

      for (let i = 0; i < data.result.length; i++) {

        this.pedidos.push({
          id: data.result[i]["id"],
          valor: data.result[i]["valor"],
          qtd: data.result[i]["qtd"],
          nome: data.result[i]["nome"],
          produtos_id: data.result[i]["produtos_id"],
          data: data.result[i]["data"]

        });
        
        this.id           = data.result[i]["id"];
        this.produtos_id  = data.result[i]["produtos_id"];
        this.dataFormat   = data.result[i]["data"];
        this.nome         = data.result[i]["nome"];
        this.totalAB     += Number(data.result[i]["valor"]) ;
        this.totalPR     += Number(data.result[i]["qtd"]) ;

        this.qtd_pedidos = Number(data.result[i]["qtd"]);
        
        this.qtd_total = (this.qtd_produto) - (this.qtd_pedidos);
        
      }

    })

  }


  finalizar() {

    this.cart.items.forEach(item => {
         
      let body2 = {
       
        produtos_id: item.id,
        qtd:  this.qtd_total,
        crud: 'atualizar-produtos'
      };
  
      this.serve.postData(body2, 'produtos.php').subscribe(data => {
  
      });

      let body = {
        id: item.id,
        produtos_id: this.produtos_id,
        nome: this.nome,
        qtd:  this.qtd_pedidos,
        valor: Number(this.totalAB),

        crud: 'atualizar-item'
      };

      this.serve.postData(body, 'produtos.php').subscribe(data => {

      });

      

    })
  
    this.showInsertOk();

  }


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu pedido foi enviado com sucesso !!!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {

            this.navCtrl.setRoot('HomePage')
          }
        }
      ]
    });
    alert.present();
  }



}

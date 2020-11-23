import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ServiceProvider } from '../../providers/service/service';



@IonicPage({})
@Component({
  selector: 'page-contador',
  templateUrl: 'contador.html',
})
export class ContadorPage {
  id: number;
  cont: number = 1;
  soma: number = 0;
  soma1: number = 0;
  soma2: number = 0;
  somaTotal: number = 0;
  somaTotal2: number = 0;
  total: number = 0;
  sub: number = 0;
  items: Array<any> = [];
  contador: Array<any> = [];

  constructor(public navCtrl: NavController,
    private serve: ServiceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams, public cart: CartProvider) {
  }


  removeItem(index) {
    this.cart.removeItem(index);
  }

  calculateTotal() {
    this.cart.calculateTotal();
  }

  contarMais(id) {

    if (id >= 0) {


      this.cart.items.forEach(item => {

        if (id == item.id) {

          item.cont++;

          item.total = (Number(item.valor)) * (Number(item.cont));

          this.soma1 = item.total;

        

        } else {

          item.total = (Number(item.valor)) * (Number(item.cont));
          this.soma2 = item.total;
          

        }

        this.somaTotal2 = Number(this.soma1) + Number(this.soma2);
      
      })

    }


  }


  contarMenos(id) {

    if (id >= 0) {


      this.cart.items.forEach(item => {

        if (id == item.id) {

          item.cont--;

          item.total = (Number(item.valor)) * (Number(item.cont));

          this.soma1 = item.total;

         

        } else {

          item.total = (Number(item.valor)) * (Number(item.cont));
          this.soma2 = item.total;
        

        }

        this.somaTotal2 = Number(this.soma2) - Number(this.soma1);
      

      })



    }

  }


  finalizar() {
    this.cart.items.forEach(item => {
      let body = {

        produtos_id: item.id,
        nome: item.nome,
        qtd: item.cont,
        valor: Number(item.total),
        crud: 'add-item'
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

            this.navCtrl.setRoot('CheckoutPage');
          }
        }
      ]
    });
    alert.present();
  }


}

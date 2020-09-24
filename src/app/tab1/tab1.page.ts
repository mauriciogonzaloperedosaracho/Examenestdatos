import { PilaLe } from './../classes/pila-le';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  infija = '';
  postfija = '';
  pila: PilaLe;
  resultado = '';
  aux: Number;
  auxx = '';
  auxxx: PilaLe;

  constructor() {
    this.pila = new PilaLe();
  }
  agregarApostfija(car: string) {
    this.postfija = this.postfija + car ;
  }
  convertirApostfija() {
    this.postfija = '';

    for (let i = 0; i < this.infija.length; i++) {//como cuanta varias veces el tamanio de las la infija
      let c = this.infija.charAt(i);//intuyo que el problema esta aqui
      console.log(c);
      switch (c) {
        case '('://en esta parte o funciona cuando hay un parentesis cerrado sin su abierto
          this.pila.insertar(c);
          
          break;
        case ')'://en esta parte funciona por ejemplo(1+(1+1)
           this.auxxx=this.pila;
          while (!this.pila.vacia() && this.pila.verUltimo() !== '(') {
            let extraido = this.pila.extraer();
            this.agregarApostfija(extraido);
            console.log(extraido);
          }
          if(this.auxxx!==null){
            if(this.auxxx.verUltimo() ==='('){
              this.pila.extraer();
            }
            else{
              this.agregarApostfija(c);
            }
          }
          this.pila.extraer();
          if(!this.pila.vacia()){
            return this.postfija ='Verifique los parentesis';
          }
          break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
          while (!this.pila.vacia() && this.prioridad(c) <= this.prioridad(this.pila.verUltimo())) {
            const extraido = this.pila.extraer();
            this.agregarApostfija(extraido);
          }
          this.pila.insertar(c);
          break;

        default:
          
          if(!Number.isInteger(this.cadenaAnumero(this.postfija))){// intente con catenar los valores para mas de 1 digito pero no es igual que c++
            this.auxx=this.postfija.concat(c)
            this.postfija='';
            this.agregarApostfija(this.auxx);
          }else{
            this.agregarApostfija(c);
          }
          break;
          
      }
    }
    // Vaciar los operadores que quedaron en la pila
    while (!this.pila.vacia()) {
      this.agregarApostfija(this.pila.extraer());
    }
    
  }
  evaluarPostfija() {
    let op1: number;
    let op2: number;
    let res: number;
    for (let i = 0; i < this.postfija.length; i++) {
      const c = this.postfija.charAt(i);
      
      switch (c) {
        case '+':
          op2 = this.cadenaAnumero( this.pila.extraer() );
          op1 = this.cadenaAnumero( this.pila.extraer() );
          res = op1 + op2;
          this.pila.insertar('' + res);
          break;
        case '-':
          op2 = this.cadenaAnumero( this.pila.extraer() );
          op1 = this.cadenaAnumero( this.pila.extraer() );
          res = op1 - op2;
          this.pila.insertar('' + res);
          break;
        case '*':
          op2 = this.cadenaAnumero( this.pila.extraer() );
          op1 = this.cadenaAnumero( this.pila.extraer() );
          res = op1 * op2;
          this.pila.insertar('' + res);
          break;
        case '/':
          if(op2 !=0){
            op2 = this.cadenaAnumero( this.pila.extraer() );
            op1 = this.cadenaAnumero( this.pila.extraer() );
            res = op1 / op2;
            this.pila.insertar('' + res);
          }else{
            return;
          }
          break;
        case '^':
          op2 = this.cadenaAnumero( this.pila.extraer() );
          op1 = this.cadenaAnumero( this.pila.extraer() );
          res = Math.pow(op1, op2);
          this.pila.insertar('' + res);
          break;
        default:
          this.pila.insertar(c);

      }
      this.pila.ver();
    }
    this.resultado = this.pila.extraer();
  }
  cadenaAnumero(cad: string): number {
    return +cad;
  }
  prioridad(operador: string): number {
    switch (operador) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      case '^':
        return 3;
      case '(':
        return 0;
      default:
        return -1;
    }
  }
}

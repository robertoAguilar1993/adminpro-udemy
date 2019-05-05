import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { retry, map, filter } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscription:  Subscription;

  ngOnDestroy(): void {
    console.log('La pagina se va cerrar');
    this.suscription.unsubscribe();
  }

  constructor() {

    this.suscription = this.returnObserver().pipe(retry(2)).
    subscribe(
      numero =>  console.log('sus', numero),
      error => console.error('Error ', error),
      () => console.log('Termino')
    );

  }

  ngOnInit() {
  }



  returnObserver(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        const salida: any = {
          valor: contador
        };
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        /*
        if (contador === 2 ) {
          observer.error('Error : el resultado no puede ser 2');
        }*/
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        return valor % 2  !== 0;
      })
    );
  }



}

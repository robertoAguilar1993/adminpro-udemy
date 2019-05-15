import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let  url = URL_SERVICIOS + '/img';

    console.log('Img');
    console.log(img);

    if ( !img ) {
      console.log('la imagen no existe');
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      console.log('es imgen de google');
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
         url += '/usuarios/' + img;
        break;
      case 'medico':
         url += '/medicos/' + img;
        break;
      case 'hospital':
         url += '/usuarios/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe');
        url += '/usuarios/xxx';
    }
    console.log('url');
    console.log(url);
    return url;
  }

}

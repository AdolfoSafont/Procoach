import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError (code: string) {

    switch(code) {

      //El correo ya existe.
      case FirebaseCodeErrorEnum.emailAlreadyInUse:
        return 'El usuario ya existe.'

      //Contraseña debil.
      case FirebaseCodeErrorEnum.weakPassword:
        return 'La contraseña es muy debil.'

      //Correo invalido
      case FirebaseCodeErrorEnum.invalidEmail:
        return 'Correo invalido.'

      //Contraseña incorrecta
      case FirebaseCodeErrorEnum.wrongPassword:
        return 'Contraseña incorrecta.'

      //El usuario no existe
      case FirebaseCodeErrorEnum.userNotFound:
        return 'El usuario no existe.'
        
      default:
        return 'Error desconocido'
    }
  }
}

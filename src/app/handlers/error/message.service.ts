import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(
    msg: string,
    isError: boolean = false
  ): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

    // devolve um Observable vazio com mensagem de erro
    errorHandler(error: any): Observable<any> {
      console.log(error);
      this.showMessage(error, true);
      return EMPTY;
    }
}

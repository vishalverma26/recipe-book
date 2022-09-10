import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input('errorMessage') message: string;
  @Output('errorMessageChange') messageChange: EventEmitter<null> = new EventEmitter();

  closeAlert(){
    this.messageChange.emit(null);
  }
}

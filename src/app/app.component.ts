import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/logging.service';
import { AuthService } from './auth/auth.service';
type loadedFeatureType = 'recipes' | 'shopping-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'recipe book';
  constructor(private authService: AuthService, private loggingService: LoggingService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello From Appcomonent ngOnInit');
  }

}

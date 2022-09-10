import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
type loadedFeatureType = 'recipes' | 'shopping-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'recipe book';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin()
  }

}

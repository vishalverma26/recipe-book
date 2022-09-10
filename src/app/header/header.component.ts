import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private dataStorage: DataStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  saveData() {
    this.dataStorage.storeRecipes();
  }

  fetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  logout() {
    this.authService.logout().subscribe(_ => {
      this.router.navigate(['/']);
    });
  }

}

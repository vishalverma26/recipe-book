import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/logging.service';
import { Ingredient } from '../shared/misc/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  ingredients: Ingredient[];

  constructor(private shoppingListSvc: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListSvc.getIngredients();
    this.subscription.add(this.shoppingListSvc.ingredientUpdated.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    }));

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number | string) {
    this.shoppingListSvc.startedEditing.next(index);
  }

}

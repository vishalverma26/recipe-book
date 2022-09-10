import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/misc/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  subscription: Subscription = new Subscription();
  editMode: boolean = false;
  editedItemIndex: number | string;
  editedItem: Ingredient;
  constructor(private shoppingListSvc: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription.add(this.shoppingListSvc.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListSvc.getIngredient(index);
      this.shoppingForm.setValue({
        fname: this.editedItem.name,
        amount: this.editedItem.amount
      });
    }));
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(shoppingForm: NgForm) {
    const nameInput = shoppingForm.value?.fname;
    const amountInput = Number(shoppingForm.value?.amount);
    const ingredient = new Ingredient(nameInput, amountInput);
    if(this.editMode) {
      this.shoppingListSvc.updateIngredient(this.editedItemIndex, ingredient)
      this.onClear();
    } else {
      if(nameInput && amountInput) this.shoppingListSvc.addIngredient(ingredient);
    }
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListSvc.deleteIngredient(this.editedItemIndex);
    this.onClear();
    this.editedItemIndex = '';
  }

}

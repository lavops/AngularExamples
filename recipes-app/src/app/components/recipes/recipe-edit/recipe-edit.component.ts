import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from '../../../models/recipe.model';

import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../../../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSubcription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null ? true : false;

      this.initForm();
    });
  }

  ngOnDestroy() {
    if(this.storeSubcription){
      this.storeSubcription.unsubscribe();
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      //this.recipe = this.recipeService.getRecipe(this.id);
      this.storeSubcription = this.store.select('recipe').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, recipeIndex) => {
          return recipeIndex === this.id;
        })
      })).subscribe(recipe => {
        this.recipe = recipe;
        
        recipeName = this.recipe.name;
        recipeImagePath = this.recipe.imagePath;
        recipeDescription = this.recipe.description;

        if(this.recipe['ingredients']) {
          for(let ingredient of this.recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      })      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    const recipeName = this.recipeForm.value['name'];
    const recipeImagePath = this.recipeForm.value['imagePath'];
    const recipeDescription = this.recipeForm.value['description'];
    const recipeIngredients: Ingredient[] = this.recipeForm.value['ingredients'];
    const newRecipe = new Recipe(recipeName, recipeDescription, recipeImagePath, recipeIngredients);

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, recipe: newRecipe}));
    }
    else {
      //this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

    //AKO BRISEM SVE
    //(<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}

import { Component, Input } from '@angular/core';
import { RecipeCard } from 'src/app/core/interfaces/recipeCard.interface';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
    selector: 'app-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
    @Input() recipeCard: RecipeCard = {} as RecipeCard;

    constructor(private router: Router) {}

    // Redirects to specific recipe
    onClickCard() {
        console.log(this.recipeCard._id);
        this.router.navigateByUrl(`recipes/${this.recipeCard._id}`);
    }
}

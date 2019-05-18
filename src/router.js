import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import IngredsList from "./views/IngredsList.vue";
import Ingredient from "./views/Ingredient.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/ingredsList",
      name: "ingredients",
      component: IngredsList
    },
    {
      path: "/ingredient/:ingredientName",
      name: "ingredient",
      component: Ingredient
    }
  ]
});

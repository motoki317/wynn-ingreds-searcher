<template>
  <div>
    <div class="ingreds-list-container" v-if="list">
      <h1>List of Ingredients</h1>
      <h3>Click on an ingredient name for details</h3>
      <span
        class="ingredient"
        v-for="ingred in list"
        :key="ingred"
        @click="moveToIngredient(ingred)"
      >
        {{ ingred }}
        <br />
      </span>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";
// const api = "https://api.wynncraft.com/v2/ingredient";
export default {
  name: "IngredsList",
  data() {
    return {
      list: null,
      error: null,
      headers: {}
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API_ENDPOINT + "/list", {
        headers: this.headers
      })
      .then(response => {
        this.list = response.data.data;
      })
      .catch(err => {
        this.error = "Something went wrong while requesting API...";
        console.error(err);
      });
  },
  methods: {
    moveToIngredient(ingred) {
      this.$router.push(this.ingUrl(ingred));
    },
    ingUrl(ingred) {
      return "/ingredient/" + ingred.split(" ").join("_");
    }
  }
};
</script>

<style>
.ingredient {
  cursor: pointer;
}
.ingredient:hover {
  font-weight: bold;
}
</style>

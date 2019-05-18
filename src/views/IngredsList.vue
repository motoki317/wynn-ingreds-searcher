<template>
  <div>
    <div class="ingreds-list-container">
      <div v-if="list">
        <div v-for="ingred in list" :key="ingred">
          <router-link :to="ingUrl(ingred)">{{ ingred }}</router-link>
        </div>
      </div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>Loading...</div>
    </div>
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
      error: null
    };
  },
  mounted() {
    axios
      .get("/api/list", {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "content-type": "application/json"
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
    ingUrl(ingred) {
      return "/ingredient/" + ingred.split(" ").join("_");
    }
  }
};
</script>

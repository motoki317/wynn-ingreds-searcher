<template>
  <div>
    <div class="ingreds-list-container" v-if="list">
      <h1>List of Ingredients</h1>
      <h3>Click on an ingredient name for details</h3>
      <div>
        <input
          class="search-bar"
          type="text"
          placeholder="Search for ingredient..."
          v-model="search"
        />
      </div>
      <div>
        <span
          class="ingredient"
          v-for="ingred in processedList"
          :key="ingred"
          @click="moveToIngredient(ingred)"
        >
          {{ ingred }}
          <br />
        </span>
      </div>
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
      headers: {},
      search: null
    };
  },
  mounted() {
    axios
      .get("/api/list", {
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
  },
  computed: {
    processedList() {
      if (this.search == undefined || this.search == "") {
        return this.list;
      }
      return this.list.filter(str =>
        str.toLowerCase().includes(this.search.toLowerCase())
      );
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

.search-bar {
  width: 20em;
  padding: 5px;
  margin-bottom: 20px;
  text-align: center;
}
</style>

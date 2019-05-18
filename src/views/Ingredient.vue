<template>
  <div>
    <div class="ingredient-container" v-if="ing">
      <h1 class="name">
        {{ ing.name }}
        [
        <span v-if="ing.tier == 0">☆☆☆</span>
        <span v-else-if="ing.tier == 1">★☆☆</span>
        <span v-else-if="ing.tier == 2">★★☆</span>
        <span v-else-if="ing.tier == 3">★★★</span>
        ]
        <div>
          <img
            v-bind:src="
              image + ing.sprite.id + '-' + ing.sprite.damage + '.png'
            "
          />
        </div>
      </h1>
      <h3>Level {{ ing.level }} Ingredient</h3>

      <div class="skills">
        <h2>Available Professions</h2>
        <div v-for="skill in ing.skills" :key="skill">
          <span>{{ skill }}</span>
        </div>
      </div>
      <div class="identifications" v-if="hasIdentifications">
        <h2>Identifications</h2>
        <div v-for="(id, name) in ing.identifications" :key="name">
          {{ name }}:
          <span
            v-bind:class="{
              positive: id.minimum > 0,
              negative: id.minimum < 0
            }"
            >{{ id.minimum }} ~ {{ id.maximum }}</span
          >
        </div>
      </div>
      <div class="item-only-ids" v-if="hasItemOnlyIDs">
        <h2>Item only IDs</h2>
        <div v-for="(id, name) in ing.itemOnlyIDs" :key="name">
          <span v-if="id != 0">
            {{ name }}:
            <span
              v-bind:class="{
                positive: id > 0,
                negative: id < 0
              }"
              >{{ id }}</span
            >
          </span>
        </div>
      </div>
      <div class="consumable-only-ids" v-if="hasConsumableOnlyIDs">
        <h2>Consumable only IDs</h2>
        <div v-for="(id, name) in ing.consumableOnlyIDs" :key="name">
          <span v-if="id != 0">
            {{ name }}:
            <span
              v-bind:class="{
                positive: id > 0,
                negative: id < 0
              }"
              >{{ id }}</span
            >
          </span>
        </div>
      </div>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Ingredient",
  data() {
    return {
      ing: null,
      error: null,
      image: "https://motoki317.github.io/images/vanilla/",
      headers: {}
    };
  },
  mounted() {
    axios
      .get(
        process.env.VUE_APP_API_ENDPOINT +
          "/get/" +
          this.$route.params.ingredientName,
        {
          headers: this.headers
        }
      )
      .then(response => {
        this.ing = response.data.data[0];
      })
      .catch(err => {
        this.error = "Something went wrong while requesting API...";
        console.error(err);
      });
  },
  computed: {
    hasIdentifications() {
      return Object.keys(this.ing.identifications) != 0;
    },
    hasItemOnlyIDs() {
      for (var name in this.ing.itemOnlyIDs) {
        if (this.ing.itemOnlyIDs[name] != 0) {
          return true;
        }
      }
      return false;
    },
    hasConsumableOnlyIDs() {
      for (var name in this.ing.consumableOnlyIDs) {
        if (this.ing.consumableOnlyIDs[name] != 0) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style>
.positive {
  color: green;
}

.negative {
  color: red;
}
</style>

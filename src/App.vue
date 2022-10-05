<script setup>
import { RouterLink, RouterView } from 'vue-router'
import food from '../src/food.json'

</script>

<template>

  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <RouterLink to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/products" class="top-bar-link">
        <span>Products</span>
      </RouterLink>
      <RouterLink to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </RouterLink>
    </nav>
    <div @click="toggleSidebar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>

  <RouterView :inventory="inventory" />

  <Sidebar 
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :removeItem="removeItem"
  />
</template>

<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: {
      Sidebar
    },
    data() {
      return {
        showSidebar: false,
        // toggleSidebar: true,
        cart: {},
        inventory: food,
        // removeItem: true
      }
    },
    computed: {
      totalQuantity() {
        return Object.values(this.cart).reduce((acc, curr) => {
          return acc + curr
        }, 0)
      }
    },
    methods: {
      addToCart(name, index) {
        if (!this.cart[name]) this.cart[name] = 0
        this.cart[name] += this.inventory[index].quantity
        this.inventory[index].quantity = 0
        console.log(this.cart)
      },
      toggleSidebar() {
        this.showSidebar = !this.showSidebar
      },
      removeItem(name) {
        delete this.cart[name]
      }
    }
  }
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->

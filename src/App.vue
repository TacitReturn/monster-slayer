<template>
  <v-app>
    <v-main>
      <v-app-bar density='compact' class="bg-blue-darken-2">
        <v-app-bar-title class="text-white">
          Monster Slayer
        </v-app-bar-title>
      </v-app-bar>
      <MonsterSlayer></MonsterSlayer>
    </v-main>
  </v-app>
</template>

<script>
import MonsterSlayer from './components/MonsterSlayer.vue'


export default {
  name: 'App',

  components: {
    MonsterSlayer,
  },

  data: () => ({
    //
  }),
}
</script>

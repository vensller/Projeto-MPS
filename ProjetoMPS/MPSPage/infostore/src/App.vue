<template>
  <v-app>    
    <v-toolbar dark>         
      <v-toolbar-title class="white--text">        
        Fornecedores - MPS
      </v-toolbar-title>

      <v-spacer></v-spacer>                
    
      <router-link :to="{name: 'company'}">
        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-content> 
      <router-view></router-view>     
    </v-content>  
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>

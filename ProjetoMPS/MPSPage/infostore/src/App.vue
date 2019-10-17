<template>
  <v-app>    
    <v-toolbar dark>         
      <v-toolbar-title class="white--text">        
        Info Store   
      </v-toolbar-title>

      <v-spacer></v-spacer>                
    
      <router-link :to="{name: 'companyPage'}">
        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>
      </router-link>

      <router-link :to="{name: 'cartPage'}">
        <v-btn icon>
          <v-icon>shopping_cart</v-icon>
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

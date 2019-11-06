<template>
    <v-app>
        <v-toolbar dark>
            <v-toolbar-title class="white--text">
                Fornecedores - MPS
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <router-link :to="{name: 'index'}">
                <v-btn icon>
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>
            <!--            <router-link :to="{name: 'company'}">-->
            <v-btn icon @click="openLogin">
                <v-icon>person</v-icon>
            </v-btn>
            <!--            </router-link>-->

        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-dialog v-model="dialogLogin" persistent max-width="400">
            <login
                v-on:onCompanyCreated="componentCreated"
                v-on:OnCloseCompanyScreen="closeLogin"
            ></login>
        </v-dialog>
    </v-app>
</template>

<script>
  import Login from './components/Login'

  export default {
    name: 'App',
    data () {
      return {
        dialogLogin: false,
        editFunc: Function
      }
    },
    components: {
      'login': Login
    },
    methods: {
      closeLogin () {
        this.dialogLogin = false
      },
      openLogin() {
        this.dialogLogin = true
      },
      componentCreated (item) {
        this.editFunc = item
      }
    }
  }
</script>

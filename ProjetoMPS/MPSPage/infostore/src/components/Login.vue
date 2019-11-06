<template>
    <v-card>
        <v-card-title>
            <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Login" v-model="login" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Senha" v-model="password" required></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="submit">Entrar</v-btn>
            <v-btn color="blue darken-1" flat @click="close">Fechar</v-btn>
        </v-card-actions>
        <v-snackbar
            v-model="snackbar"
            :bottom="false"
            :left="false"
            :multi-line="true"
            :right="false"
            :timeout="6000"
            :top="true"
            :vertical="false"
        >
            {{text}}
            <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {
        login: '',
        password: '',
        snackbar: false,
        registered: false
      }
    },
    methods: {
      submit () {
        let data = JSON.stringify({
          login: this.company,
          password: this.classification
        })

        var vm = this
        fetch('http://localhost:3000/login', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: data
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              vm.text = data.error
              vm.snackbar = true
            } else {
              vm.text = 'Login realizado com sucesso!'
              vm.snackbar = true
              vm.registered = true
              vm.reset()
            }
          })
          .catch(function (error) {
            vm.text = error
            vm.snackbar = true
            vm.reset()
          })

      },
      reset () {
        this.login = ''
        this.password = ''
      },
      close () {
        this.reset()
        this.$emit('OnCloseCompanyScreen', this.registered)
      },
      updateCompany (credentials) {
        this.login = credentials.login
        this.password = credentials.password
      }
    },
    created () {
      this.$emit('onCompanyCreated', this.updateCompany)
    }
  }
</script>

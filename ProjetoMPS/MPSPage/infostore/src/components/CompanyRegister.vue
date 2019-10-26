<template>
    <v-card>
        <v-card-title>
            <span class="headline">Cadastro de empresas</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs9>
                        <v-text-field label="Nome da empresa" v-model="company" required></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field label="Classificação" v-model="classification" required></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="submit">Salvar</v-btn>
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
        id: '',
        company: '',
        classification: '',
        text: '',
        snackbar: false,
        registered: false
      }
    },
    methods: {
      submit () {
        let data = JSON.stringify({
          id: '',
          company: this.company,
          classification: this.classification,
          comments: []
        })

        var vm = this

        if (this.id === '') {
          fetch('http://localhost:3000/company', {
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
                vm.text = 'Empresa cadastrada com sucesso!'
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
        } else {
          fetch('http://localhost:3000/company/update', {
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
                vm.text = 'Empresa alterada com sucesso!'
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
        }
      },
      reset () {
        this.company = ''
        this.classification = ''
      },
      close () {
        this.reset()
        this.$emit('OnCloseCompanyScreen', this.registered)
      },
      updateCompany (company) {
        this.id = company._id
        this.classification = company.classification
        this.company = company.company
      }
    },
    created () {
      this.$emit('onCompanyCreated', this.updateCompany)
    }
  }
</script>

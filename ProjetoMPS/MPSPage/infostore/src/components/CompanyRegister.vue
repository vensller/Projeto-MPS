<template>
    <v-card>
        <v-card-title>
            <span class="headline">Cadastro de empresas</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Nome da empresa" v-model="company" required></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field label="Senha" v-model="password" type="password" required></v-text-field>
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
        password: '',
        snackbar: false,
        registered: false,
        comments: [],
        messages: [],
        rate: 0
      }
    },
    methods: {
      submit () {
        let data = JSON.stringify({
          company: this.company,
          password: this.password,
          classification: this.classification,
          comments: [],
          messages: []
        })

        var vm = this
        console.log("Id: ", this.id)
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
          fetch('http://localhost:3000/company', {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
              _id: this.id,
              company: this.company,
              password: this.password,  
              classification: this.classification,
              comments: this.comments,
              messages: this.messages
            })
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
                localStorage.removeItem('company');
                let comp = data;
                comp.company= vm.company;
                comp.password= vm.password;
                comp.classification= vm.classification;
                comp.comments= vm.comments;
                comp.messages= vm.messages;     
                comp.rate = vm.rate;           
                localStorage.setItem('company', JSON.stringify(comp));                
                vm.reset();
                vm.close();
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
        this.id='';
        this.company = '';
        this.classification = '';
        this.password = '';
        this.comments = [];
        this.messages = [];
        this.rate = 0;
      },
      close () {
        this.reset()
        this.$emit('OnCloseCompanyScreen', this.registered)
      },
      updateCompany (company) {
        this.id = company._id;
        this.classification = company.classification;
        this.company = company.company;
        this.password = company.password; 
        this.comments = company.comments;
        this.messages = company.messages;
        this.rate = company.rate;
      }
    },
    created () {
      this.$emit('onCompanyCreated', this.updateCompany)
    }
  }
</script>

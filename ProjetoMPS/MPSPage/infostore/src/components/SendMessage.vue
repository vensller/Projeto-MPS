<template>
    <v-card>
        <v-card-title>
            <span class="headline">Enviar mensagem</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Nome" v-model="name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="E-mail" v-model="email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Telefone" v-model="phone" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Mensagem" v-model="message" required></v-text-field>
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
        name: '',
        email: '',
        phone: '',
        message: '',
        snackbar: false,
        registered: false,
        text: '',
        company: undefined
      }
    },
    methods: {
      submit () {
        if (!this.company.messages)
          this.company.messages = [];
        
        this.company.messages.push({name: this.name,
                                    email: this.email,
                                    phone: this.phone,
                                    message: this.message
        });
        let data = JSON.stringify(this.company);
        console.log("Data: ", data)
        var vm = this
        fetch('http://localhost:3000/company', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: data
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              vm.text = data.error
              vm.snackbar = true
            } else {
              vm.text = 'Message enviada com sucesso!'
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
      close () {
        this.reset()
        this.$emit('OnCloseCompanyScreen')
      },
      reset () {
        this.name = ''
        this.email = ''
        this.phone = ''
        this.message = ''
        this.company = undefined
      },
      updateCompany (company) {
        console.log("Company: ", company);
        this.company = company;
      }
    },
    created () {
      this.$emit('onCompanyCreated', this.updateCompany)
    }
  }
</script>

<template>
    <v-card>
        <v-card-title>
            <h1>Empresa - {{companyName}}</h1>
<!--            <v-btn icon @click="dialog = true">-->
<!--                <v-icon>add</v-icon>-->
<!--            </v-btn>-->

            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="companies"
            :search="search"
            :pagination.sync="pagination"
            class="elevation-1"
        >
            <template v-slot:items="props">
                <tr>
                    <td>{{props.item.company}}</td>
                    <td>{{props.item.classification}}</td>                    
                    <td>{{props.item.rate}}</td>
                    <td class="text-xs-center">
                        <v-btn text icon @click="deleteCompany(companies.find(i => i === props.item))">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn text icon @click="updateCompany(companies.find(i => i === props.item))">
                            <v-icon>account_circle</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-container style="margin-top: 32px">            
          <v-sheet>
              <p class="title">
                  Mensagens privadas
              </p>
              <v-data-table
                  :headers="desserts"
                  :items="messages"
                  class="elevation-1"
              >
                  <template v-slot:items="props">
                      <tr>
                          <td>{{props.item.name}}</td>
                          <td>{{props.item.email}}</td>
                          <td>{{props.item.phone}}</td>
                          <td>{{props.item.message}}</td>
                      </tr>
                  </template>
              </v-data-table>
          </v-sheet>
        </v-container>
        <v-dialog v-model="dialog" persistent max-width="800">
            <company-register
                v-on:onCompanyCreated="componentCreated"
                v-on:OnCloseCompanyScreen="closeRegister"
            ></company-register>
        </v-dialog>
    </v-card>
</template>

<script>
  import CompanyRegister from '../components/CompanyRegister'

  export default {
    data () {
      return {
        pagination: {
          rowsPerPage: 10
        },
        search: '',
        headers: [
          {
            text: 'Empresa',
            value: 'company'
          },
          {
            text: 'Classificação',
            value: 'classification'
          },
          {
            text: 'Rate',
            value: 'rate'
          },          
          {
            text: 'Opções',
            value: '_id',
            sortable: false,
            align: 'center'
          }
        ],
        desserts: [
          {
            text: 'Nome',
            value: 'name'
          },
          {
            text: 'E-mail',
            value: 'email'
          },
          {
            text: 'Telefone',
            value: 'phone'
          },
          {
            text: 'Mensagem',
            value: 'message'
          }
        ],
        companies: [],
        dialog: false,
        dialogOrders: false,
        dialogSendMessage: false,
        editFunc: Function,
        companyName: '',
        messages: []
      }
    },
    components: {
      'company-register': CompanyRegister
    },
    methods: {      
      closeRegister (pRegistered) {
        this.dialog = false
        if (pRegistered) {
          this.verifyCompany();
        }
      },
      openSend (company) {
        this.editFunc(company)
        this.dialogSendMessage = true
      },
      closeSend () {
        this.dialogSendMessage = false
      },
      showComments (company) {
        localStorage.setItem('company', JSON.stringify(company))
        this.$router.push({ name: 'comments' })
      },
      deleteCompany (company) {
        let data = JSON.stringify({
          _id: company._id,
          company: company.company,
          password: company.password,
          classification: company.classification,
          comments: [],
          rate: 0
        })
        fetch('http://localhost:3000/company', {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
          body: data
        })
          .then(() => this.fetchCompanies())
          .catch(erro => console.log(erro))
      },
      async updateCompany (company) {
        this.editFunc(company)
        this.dialog = true        
      },
      componentCreated (item) {
        this.editFunc = item
      },
      verifyCompany(){
        let company = localStorage.getItem('company');

        if (company){
          company = JSON.parse(company);
          console.log(company);
          this.companyName = company.company;
          this.companies = [company];
          this.messages = company.messages;
        }else this.$router.push({name: 'index'});
      }
    },
    async mounted () {
      this.verifyCompany();      
    }
  }
</script>

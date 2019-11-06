<template>
    <v-card>
        <v-card-title>
            <h1>Empresas - MPS/BR</h1>

            <v-btn icon @click="dialog = true">
                <v-icon>add</v-icon>
            </v-btn>

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
                    <td class="text-xs-center">
                        <v-btn icon @click="showComments(companies.find(i => i === props.item))">
                            <v-icon>add_comment</v-icon>
                        </v-btn>
                        <v-btn icon @click="openSend(companies.find(i => i === props.item))">
                            <v-icon>message</v-icon>
                        </v-btn>
<!--                        <v-btn text icon @click="deleteCompany(companies.find(i => i === props.item))">-->
<!--                            <v-icon>delete</v-icon>-->
<!--                        </v-btn>-->
<!--                        <v-btn text icon @click="updateCompany(companies.find(i => i === props.item))">-->
<!--                            <v-icon>account_circle</v-icon>-->
<!--                        </v-btn>-->
                    </td>
                    <td>{{props.item.rate}}</td>
                </tr>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" persistent max-width="800">
            <company-register
                v-on:onCompanyCreated="componentCreated"
                v-on:OnCloseCompanyScreen="closeRegister"
            ></company-register>
        </v-dialog>
        <v-dialog v-model="dialogSendMessage" persistent max-width="800">
            <send-message
                v-on:onCompanyCreated="componentCreated"
                v-on:OnCloseCompanyScreen="closeSend"
            ></send-message>
        </v-dialog>
    </v-card>
</template>

<script>
  import CompanyRegister from '../components/CompanyRegister'
  import SendMessage from '../components/SendMessage'

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
            text: 'Opções',
            value: '_id',
            sortable: false,
            align: 'center'
          },
          {
            text: 'Rate',
            value: 'rate'
          }
        ],
        companies: [],
        dialog: false,
        dialogOrders: false,
        dialogSendMessage: false,
        editFunc: Function
      }
    },
    components: {
      'company-register': CompanyRegister,
      'send-message': SendMessage,
      // 'login': Login
    },
    methods: {
      async fetchCompanies () {
        await fetch('http://localhost:3000/company')
          .then(response => response.json())
          .then(data => {
            this.companies = data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      closeRegister (pRegistered) {
        this.dialog = false
        if (pRegistered) this.fetchCompanies()
      },
      openSend (company) {
        this.editFunc(company)
        this.dialogSendMessage = true;
      },
      closeSend () {
        this.dialogSendMessage = false;
      },
      showComments (company) {
        localStorage.setItem('company', JSON.stringify(company))
        this.$router.push({ name: 'comments' })
      },
      deleteCompany (company) {
        let data = JSON.stringify({
          _id: company._id,
          company: company.company,
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
        await this.fetchCompanies()
      },
      componentCreated (item) {
        this.editFunc = item
      }
    },
    async mounted () {
      await this.fetchCompanies()
    }
  }
</script>

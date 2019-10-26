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
              <v-icon>library_books</v-icon>
            </v-btn>
            <v-btn text icon @click="deleteCompany(companies.find(i => i === props.item))">
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn text icon @click="updateCompany(companies.find(i => i === props.item))">
              <v-icon>account_circle</v-icon>
            </v-btn>
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
      editFunc: Function
    }
  },
  components: {
    'company-register': CompanyRegister
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
    showComments (company) {
      localStorage.setItem('company', JSON.stringify(company))
      this.$router.push({ name: 'comments' })
    },
    deleteCompany (company) {
      console.log('Company: ', company)
      fetch('http://localhost:3000/company/delete', {
        method: 'DELETE',
        body: company
      })
        .then(response => response.json())
        .catch(erro => console.log(erro))
    },
    updateCompany (company) {
      this.editFunc(company)
      this.dialog = true
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

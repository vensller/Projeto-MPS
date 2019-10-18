<template>
  <v-card>
    <v-card-title>
      <h1>Empresas - MPS/BR</h1>
      
      <v-btn icon @click="dialog = true">
        <v-icon>add</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
              <v-icon> 
                library_books
              </v-icon>
            </v-btn>
          </td>       
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="800">
      <company-register 
        v-on:OnCloseCompanyScreen="closeRegister">
      </company-register>
    </v-dialog>    
  </v-card>
</template>

<script>
import CompanyRegister from '../components/CompanyRegister'
export default {
    data() {
        return {
            pagination: {
                rowsPerPage: 10},
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
        fetchCompanies(){
            fetch("http://localhost:3000/company").then(response => response.json()).then(data => {
                this.companies = data;
            }).catch(function(error){
                console.log(error);
            });
        },
        closeRegister(pRegistered){          
            this.dialog = false;
            if (pRegistered)
              this.fetchCompanies();
        },
        showComments(company){
          localStorage.setItem("company", JSON.stringify(company));
          this.$router.push({name: "comments"});
        }
    },
    mounted(){
        this.fetchCompanies();
    }
}
</script>

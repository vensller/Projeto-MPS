<template>
  <v-timeline
    :dense=true
  >    
    <v-timeline-item
      color="red lighten-2"
      fill-dot
    >               
        <v-card
            color="red lighten-2"
            light
            max-width="800"
        >        
            <v-card-title class="title">Nova avaliação</v-card-title>
            <v-card-text class="white text--primary">
                <v-layout wrap>  
                    <v-flex xs12>
                        <v-rating v-model="rate"></v-rating>
                    </v-flex>            
                    <v-flex xs12>
                        <v-text-field label="Nome" v-model="name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Comentário" v-model="commentary" required></v-text-field>
                    </v-flex>          
                </v-layout>                  
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    color="red lighten-1"
                    class="mx-0"
                    outlined
                    @click="submit"
                >
                Salvar
                </v-btn>
            </v-card-actions>    
        </v-card>
    </v-timeline-item>
    <v-timeline-item
      v-for="(comment, i) in company.comments"
      :key="i"
      color="red lighten-1"
      small
    >
      <v-card
            color="red lighten-1"
            dark
            max-width="800"
        >        
            <v-card-title class="title">{{comment.personName}}</v-card-title>
            <v-card-text class="white text--primary">
                <v-layout wrap>  
                    <v-flex xs12>
                        <v-rating 
                            v-model="comment.rate"
                        >
                        </v-rating>
                    </v-flex>                                    
                </v-layout>     

                {{comment.text}}    
            </v-card-text>            
        </v-card>
    </v-timeline-item>        
    <v-snackbar
        v-model="snackbar" 
        :bottom="false"
        :left="false"
        :multi-line="true"
        :right="false"
        :timeout="6000"
        :top="true"
        :vertical="false">
        {{text}}
        <v-btn
            color="pink"
            flat
            @click="snackbar = false"
        >Close</v-btn>
    </v-snackbar>
  </v-timeline>  
</template>

<script>
  export default {
    data: () => ({
        snackbar: false,
        text: '',
        rate: 0,
        commentary: '',
        name: '',
        company:{}
    }),
    methods:{
        submit(){            
            this.company.comments.unshift({
                personName: this.name,
                text: this.commentary,
                rate: this.rate
            });            
            
            console.log(this.company.comments);

            var vm = this;

            fetch("http://localhost:3000/company", {            
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.company)
            }).then(response => response.json()).then(data => {                
                if (data.error){
                    vm.text = data.error;                
                    vm.snackbar = true;
                }else{
                    vm.text = "Avaliação cadastrada com sucesso!";                
                    vm.snackbar = true; 
                    localStorage.removeItem('company');
                    localStorage.setItem('company', JSON.stringify(data));
                    console.log(data);
                }
                
                vm.name = '';
                vm.commentary = '';
                vm.rate = 0;
            }).catch(function(error) {            
                vm.text = error;
                vm.snackbar = true;                    
                vm.name = '';
                vm.commentary = '';
                vm.rate = 0;
            });
        },
        fetchCommentaries(){
            let company = JSON.parse(localStorage.getItem('company'));
            if (company){
                this.company = company;
            }else this.$router.push({name: "company"});
        }
    },
    mounted(){
        this.fetchCommentaries();
    }
  }
</script>
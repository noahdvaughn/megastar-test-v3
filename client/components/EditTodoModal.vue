<template >
    <div class="edit-main" :class="className">
        <v-icon color="#2a2639"  class="edit-minus">mdi-minus</v-icon>

        <div class="edit-header">
            <v-icon class="edit-header-arrow" color="white" @click="closeModal">mdi-arrow-left</v-icon>
            <h1>Edit Todo</h1>
        </div>
        
        <v-form class="edit-form">

            <v-text-field v-model="editedTodo.title" class="edit-field" solo  hide-details="false" theme="dark"></v-text-field>

                <v-select 
                :items="userOptions" 
                v-model="editedTodo.userId"
                class="edit-select" 
                item-value="value" 
                item-text="text" 
                hide-details  
                solo 
                bg-color="#2a2639"
                dark
                > 
                    <v-icon slot="append" color="white">mdi-chevron-down</v-icon>          
                </v-select>

                <v-select :items="completedOptions" item-value="value" v-model="editedTodo.completed" item-text="text" class="edit-select"  hide-details  solo bg-color="#2a2639" > 
                    <v-icon slot="append" color="white">mdi-chevron-down</v-icon>          
                </v-select>
        </v-form>    
    <v-btn class="edit-button-green"  @click="handleSubmit">Finish</v-btn>
    <v-btn class="edit-button" @click="closeModal">Quit</v-btn>
    </div>
</template>

<script>
export default {    
    data() {
        return {
            className: 'sliding-up',
            editedTodo: {
            title: String,
            id: Number,
            userId: Number,
            completed: Boolean
            },
            userOptions: [
        {value: 1, text: 'User 1'},
        {value: 2, text: 'User 2'},
        {value: 3, text: 'User 3'},
        {value: 4, text: 'User 4'},
        {value: 5, text: 'User 5'},
    ],
    completedOptions: [
    {value: false, text: 'Not Completed'},
    {value: true, text: 'Completed'},
    ]
    }
    },
    mounted(){
        this.editedTodo = {
            id: item.id,
            title: item.attributes.title,
            userId: item.attributes.userId,
            completed: item.attributes.completed
        }
        
    },
    props: {
        item: Object
    },
methods: {
    closeModal(){
        this.className = 'sliding-down'
        setTimeout(()=>{this.$emit('toggleModal', true), this.className = 'sliding-up'  }, 300 )
    },
    handleSubmit(){
        this.$emit('updateTodo', this.editedTodo)
        this.closeModal()
    }
}    
}
</script>
<style>



.edit-main{
    left: 0;
    right: 0;
    bottom: 0;
    height: 97vh;
    width: 100%;
    background-color: #060417;
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.edit-header{
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 2rem;
    margin-top: 2rem;
}
.edit-minus{
    font-size: 6rem !important;
    margin-top: -2rem;
    margin-bottom: -2rem;
}
.edit-header-arrow{
    left: 1rem !important;
    position: absolute !important;
    font-size: 2rem !important;
}
.edit-field{
    margin-bottom: 1rem;
    width: 95vw;
    height: 4rem;
    border-radius: 1rem;
    padding-left: 2rem;
}
.edit-field input{
    color: white !important;
}

.edit-form{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.edit-select{
    height: 4rem;
    margin-bottom: 1rem;
    width: 95vw;
    border-radius: 1rem !important;
}
.edit-button{
    margin-bottom: 1rem;
    width: 80vw;
    background-color: transparent !important;
    color: white !important;
    opacity: 0.5;
    text-transform: none;
    font-size: 1.25rem !important;
}
.edit-button-green{
    border-radius: 0.4rem;
    height: 4rem !important;
    margin-bottom: 1rem;
    width: 80vw;
    background-color: #6add8a !important;
    color: white !important;
    text-transform: none;
    font-size: 1.25rem !important;
}


.sliding-up{
    animation: slide-up 0.3s ease-out;
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
    }
    
    to {
        transform: translateY(0);
    }
}
.sliding-down{
  animation: slide-down 0.3s ease-out;

}
@keyframes slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
.v-select__selection,
.v-select__selection--comma,
.v-select.v-text-field input {
  color: white !important;
}
.v-list{
    background-color: #060417 !important;
    color: white !important;
    fill: white !important;
}
.v-list-item{
    color: white !important;
}
    
</style>
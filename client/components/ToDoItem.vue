<template >
    <div class="item-main">
        <div class="item-container-left">
            <v-icon class="item-icon-circle-green" color= '#6add8a' v-if="item.attributes.completed === true" size="5rem">mdi-check-circle</v-icon> 
            <v-icon class="item-icon-circle" v-if="item.attributes.completed === false" size="5rem" color="#3b3753" @click="$emit('markCompleted', item.id )">mdi-checkbox-blank-circle</v-icon>
    
            <div style="display: block; text-align: start;">
                <h3 class="item-title">{{ item.attributes.title }}</h3>
                <h4 class="item-user">User: {{ item.attributes.userId }}</h4>     
            </div>
    
            
            
        </div>
        <v-menu >
            <template  v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon class="item-icon-dots" size="3rem" icon="">mdi-dots-horizontal
                    </v-icon>
                </v-btn>
            </template>
                <v-list  class="item-list">
                        <v-list-item >
                            <v-list-item-title @click="toggleModal"  class="item-list-title">
                                Edit ToDo
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title @click="$emit('markCompleted', item.id )" class="item-list-title">
                                Mark Completed
                            </v-list-item-title>
                        </v-list-item> 
                </v-list>
            </v-menu>
            <edit-todo-modal :item="item" v-if="showModal" @updateTodo="emitUpdatedTodo" @toggleModal="toggleModal"/>          
        </div>
</template>

<script>

export default {
    
  
  data() {
    return {
        showModal: false
    }
  },
    props: {
        data: Array,
        item: Object
    },
    methods: {
        toggleModal(){
            this.showModal = !this.showModal
        },
        
        emitUpdatedTodo(editedTodo){
        this.$emit('updateTodo', editedTodo)
        }
    }    
}
</script>

<style >
.item-main{
    display: flex;
    background-color: #2a2639;
    margin-bottom: 1rem;
    height: 6rem;
    margin-top: 0;
    border-radius: 1rem;
    align-items: center;
    justify-content: space-between;

    &:hover{
        background-color: #3d3850;
    }

    &:hover .item-icon-circle {
        color: #2a2639  !important;
} 
    &:hover .item-user{
        background-color: #2a2639;
    }
}
.item-menu{
    background-color: black;
    color: black;
}
.item-container-left{
    display: flex;
    align-items: center;
}
.item-icon-circle, .item-icon-circle-green{
    size: 5rem;
    margin-left: 1rem;
    margin-right: 1rem;    
    background-image: radial-gradient(at center, white 50%, transparent 40%) !important;
}
.item-icon-dots{
    margin-right: 1rem;
    font-size: 3rem;
    color: white !important;
}
.item-title{
    font-size: 1rem;
}
.item-list{
    background-color: black !important;

}
.item-list-title{
    color: white !important;
}
.item-user{
    background-color: #3f3d4e;
    opacity: 0.5;
    border-radius: 0.5rem;
    margin-right: 0;
    width: 4rem;
    font-weight: 400;
    padding-left: 0.1rem;
    color: white;
}
    
</style>
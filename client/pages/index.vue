<template>
<div class="main-body-background">

  <Header :viewingOpen="viewingOpen" @setViewingOpen="onSetViewingOpen"/>

  <v-form class="form"  @submit.prevent="searchFilter">
    <v-text-field label="Search Todo's" solo class="main-search" hide-details="false" v-model="searchQuery" >
      <v-icon slot="append" color="white">mdi-magnify</v-icon>
    </v-text-field>
  </v-form>

  <v-icon color="#2a2639"  class="main-minus">mdi-minus</v-icon>

  <div class="main-feed">

    <div v-if="viewingOpen === true"> 
      <li v-for="todo in openTodos" class="main-feed-list">
        <ToDoItem :item="todo" @markCompleted="markCompleted" @updateTodo="updateTodo"/>
      </li>
    </div>

    <div v-if="viewingOpen === false">
      <li v-for="todo in closedTodos" class="main-feed-list">
        <ToDoItem :item="todo" @updateTodo="updateTodo" />
      </li>
    </div>

  </div>

  <v-icon color="white" class="main-fab" @click="toggleModal">mdi-plus-circle</v-icon>

<add-todo-modal v-show="showModal" @toggleModal="toggleModal" @createTodo="createTodo"/>

</div>
</template>

<script>
  export default{
    head() {
    return {
      title: "MEGASTAR DEATH TEST"
    };
  },
  data() {
    return {
      openTodos: [],
      closedTodos: [],
      originalTodos: [],
      viewingOpen: true,
      showModal: false,
      searchQuery: '' 
    }
  },
  mounted() {
    this.GetToDos()
  },
  methods: {
    async GetToDos(){
      const res = await (await fetch('https://jsonplaceholder.typicode.com/users/1/todos')).json()
      this.originalTodos = res
      let openArray = []
      let closedArray = []
      for (let i=0; i<this.originalTodos.length; i++){
        if (this.originalTodos[i].completed === true){
          closedArray.push(this.originalTodos[i])
        } else {
          openArray.push(this.originalTodos[i])
        }
      }
      this.openTodos = openArray
      this.closedTodos = closedArray     
    },
    onSetViewingOpen(bool){
      this.viewingOpen = bool
    },
    markCompleted(id){
      for (let i=0; i<this.openTodos.length; i++){
        if (this.openTodos[i].id === id){
          this.openTodos[i].completed = true
          this.closedTodos.unshift(this.openTodos[i])
          const removed = this.openTodos.splice(i, 1)
        }
      }
    },
    updateTodo(editedTodo){
      for (let i=0; i<this.openTodos.length; i++){
        if (this.openTodos[i].id === editedTodo.id){         
          const removed = this.openTodos.splice(i, 1)
          if(editedTodo.completed){
            this.closedTodos.unshift(editedTodo)
          } else{
            this.openTodos.unshift(editedTodo)
          }
        }
      }
      for (let i=0; i<this.closedTodos.length; i++){
        if (this.closedTodos[i].id === editedTodo.id){
          const removed = this.closedTodos.splice(i, 1)
          if(editedTodo.completed){
            this.closedTodos.unshift(editedTodo)
          } else{
            this.openTodos.unshift(editedTodo)
          }
        }
    }
  },
  createTodo(newTodo){
    let newId = this.openTodos.length + this.closedTodos.length
    newTodo.id = newId
    if (newTodo.completed){
      this.closedTodos.unshift({...newTodo})
    } else {
      this.openTodos.unshift({...newTodo})
    }
  },
  toggleModal(){
    console.log(this.searchQuery)
    this.showModal = !this.showModal
  },
  searchFilter(){
    let filteredClosedArray = []
    let filteredOpenArray = []
    for (let i = 0; i < this.originalTodos.length; i++){
      if (this.originalTodos[i].title.includes(this.searchQuery)){
        if(this.originalTodos[i].completed){
          filteredClosedArray.push(this.originalTodos[i])       
        }else{
          filteredOpenArray.push(this.originalTodos[i])
        }
      } 
      if (this.searchQuery === null){
        filteredArray = this.originalTodos
      }
    }
    this.openTodos = {...filteredOpenArray}
    this.closedTodos = {...filteredClosedArray}
  }
}
} 
</script>

<style>
.main-feed-list{
  margin-top: -1.25rem;
}
.main-body-background{
    background-color: #060417;
    height: 100vh;
    width: 100vw;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-search{
  width: 95vw;
  border-radius: 1rem;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}
.main-minus{
  font-size: 3rem !important;
  margin-top: -1.5rem;
  margin-bottom: -0.5rem;
}
.main-fab{
  right: 1rem;
  bottom: 1rem;
  position: absolute !important;
  font-size: 6rem !important;
}
.main-feed{
  overflow-y: scroll;
  width: 95vw;
  overflow-x: hidden;
}
.main-feed::-webkit-scrollbar {
  display: none;
}
.v-input__slot{
  background-color: #2a2639 !important;
}
.v-text-field input {
  color: white !important;
}
.v-label{
  color: white !important;;
}
#input-12{
  color: white !important;
}
</style>
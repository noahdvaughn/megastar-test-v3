
<template>
    <div class="header" style="background-color: #2a2639;">

        <div class="header-title-flex">
            <h1>ToDo's</h1>
            <v-icon color="white" class="header-title-dots">mdi-dots-horizontal</v-icon>
        </div>
        <div class="header-button-flex">
            <div :class="{'header-button-underlined' : viewingOpen}" class="header-button" @click="$emit('setViewingOpen', true)">
                <h3 class="header-button-text">Open</h3>
            </div>
            <div :class="{'header-button-underlined' : !viewingOpen}" class="header-button" @click="$emit('setViewingOpen', false)">
                <h3 class="header-button-text">Closed</h3>
            </div>
    

        </div>
    </div>
</template>

    <script> 
    export default {           
        props: {
            viewingOpen: Boolean
        },
    }
    
    </script>


<style>
.header{
    width: 100vw;
}
h1{
    color: white
}
h3{
    color: white;
}
.header-title-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 3vh;
    margin-bottom: 3vh;
}
.header-title-dots{
    font-size: 3rem !important;
}
.header-button-flex{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 100
}
.header-button-text{
    font-size: 1.5rem;
    font-weight: 400;
}
.icon{
    color: white;
    font-size: 3rem;
    margin-right: 1.5rem;
}
.header-button{
    cursor: pointer;
    opacity: 0.5;
    width: 20vw;
    
   
    border-bottom: 0.2rem solid transparent;
    &:hover{
        border-bottom: 0.2rem solid white;
    }
}
.header-button-underlined{
    opacity: 1;
    width: 20vw;
    border-bottom: 0.2rem solid white;
}

</style>
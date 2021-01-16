<template>

  <div id="app">

    <div id="nav">
      <div class="nav-group">
        <router-link class="title" to="/all">全部</router-link> |
        <router-link class="title" to="/active">未完成</router-link> |
        <router-link class="title" to="/complete">已完成</router-link>
      </div>
    </div>

    <div class="content-group">
        <div class="content">
          <AddTodo />
          <div id="list">
            <TodoListItem v-for="index in todoIndex" :key="index" :index="index"/>
          </div>
        </div>
    </div>

  </div>

</template>

<script>
  import TodoListItem from '@/components/TodoListItem/index.vue'
  import AddTodo from '@/components/AddTodo/index.vue'

  export default {
    components: {
      TodoListItem,
      AddTodo
    },
    computed: {
      todoIndex() {
        return this.$store.getters['todoIndex']
      },
    },
    mounted() {
      this.$store.dispatch('INIT_TODOS')
    },
    methods: {
      dateSort(a,b) {
        return a.deadline - b.deadline
        //return this.todos.sort(function(a,b) { a.deadline > b.deadline ? 1 : -1})
      }
    }
  }
</script>


<style src="@/assets/css/style.css"></style>
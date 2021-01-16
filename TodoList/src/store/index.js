import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LS = {
  load() {
    return JSON.parse(localStorage.getItem('vue-todos') || '[]' )
  },
  save(data) {
    localStorage.setItem('vue-todos', JSON.stringify(data))
  }
}

const filter = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => {
      return !todo.complete
    })
  },
  complete(todos) {
    return todos.filter(todo => {
      return todo.complete
    })
  }
}



export default new Vuex.Store({
  strict: true,
  state: {
    todos: [
      { content:'AAA', complete: false, deadline: false, comment: false, mark: false },
      { content:'BBB', complete: true, deadline: false, comment: false, mark: false },
      { content:'CCC', complete: true, deadline: false, comment: false, mark: false },
    ],
  },
  getters: {
    todoIndex(state) {
      return filter[state.route.name](state.todos).map(todo => 
        state.todos.indexOf(todo))
    },
  },
  mutations: {
    SET_TODOS(state, data) {
      state.todos = data
      LS.save(state.todos)
    },
    ADD_TODOS(state, data) {
      state.todos.push(data)
      state.todos.sort(function(a, b) {return a.deadline > b.deadline ? 1 : -1 })
      LS.save(state.todos)
    },
    UPDATE_TODO(state, {index, data}) {
      state.todos[index].content = data.content
      state.todos[index].complete = data.complete
      state.todos[index].mark = data.mark
      state.todos[index].deadline = data.deadline
      state.todos[index].comment = data.comment
      LS.save(state.todos)
    },
    REMOVE_TODO(state, index) {
      state.todos.splice(index, 1)
      LS.save(state.todos)
    }
  },
  actions: {
    INIT_TODOS({ commit }) {
      commit('SET_TODOS', LS.load())
    }
  },
  modules: {
  }
})

<template src="./template.html"></template>

<script>
  export default {
    data() {
      return {
        edit: null,
        deadline:'',
        comment:'',
      }
    },
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    watch: {
      "todo.mark": function(val) {
        console.log('watching')
        console.log(val)
      }
    },
    computed: {
      todo() {
        return this.$store.state.todos[this.index]
      },
      complete: {
        get() {
          return this.todo.complete
        },
        set(val) {
          this.$store.commit('UPDATE_TODO', {
            index: this.index,
            data: {
              content: this.todo.content,
              complete: val,
              mark: this.todo.mark,
              deadline: this.todo.deadline,
              comment: this.todo.comment
            }
          })
        }
      },
      mark: {
        get() {
           return this.todo.mark
        },
        set(val) {
          this.$store.commit('UPDATE_TODO', {
            index: this.index,
            data: {
              content: this.todo.content,
              complete: this.todo.complete,
              deadline: this.todo.deadline,
              comment: this.todo.comment,
              mark: val,
            }
          })
        }
      }
    },
    methods: {
      destroyHandler() {
        if (confirm(`是否要刪除 ${ this.todo.content } ?`))
          this.$store.commit('REMOVE_TODO', this.index)
      },
      editHandler() {
        this.edit = this.todo.content
      },
      submitHandler() {
        if (!this.edit) return this.destroyHandler()
        this.$store.commit('UPDATE_TODO', {
          index: this.index,
          data: {
            content: this.edit,
            complete: this.todo.complete,
            mark: this.todo.mark,
            deadline: this.deadline,
            comment: this.comment
          }
        })
        this.cancelHandler()
      },
      cancelHandler() {
        this.edit = null
      },
    }
  }
</script>
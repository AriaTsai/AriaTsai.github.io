<template src="./template.html"></template>

<script>

  export default {
    data() {
      return {
        addnew: 'A',
        todo: '',
        deadline:'',
        comment:'',
        mark: false,
      }
    },
    methods: {
      addNewtask() {
        this.addnew = 'B'
      },
      cancelHandler() {
        this.addnew = 'A'
        this.todo = ''
      },
      markHandler() {
        let mark = document.querySelector('.star-group')
        if (mark.checked) {
          this.mark = true
          console.log(this.mark)
        } else {
          this.mark = false
          console.log(this.mark)
        }
      },
      submitHandler() {
        if (!this.todo) return
        this.$store.commit('ADD_TODOS', {
          content: this.todo,
          complete: false,
          deadline: this.deadline,
          comment: this.comment,
          mark: this.mark,
        })
        this.todo = ''
        this.deadline = ''
        this.comment = ''
        this.addnew = 'A'
      }
    }

  }
</script>
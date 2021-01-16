;(function(Vue){
  new Vue({
    el: '#game',
    data: {
      pic: [
        { title: '河馬', url: 'pic2/hippo.png'},
        { title: '獅子', url: 'pic2/lion.png'},
        { title: '松鼠', url: 'pic2/mouse.png'},
        { title: '熊貓', url: 'pic2/panda.png'},
        { title: '兔子', url: 'pic2/rabbit.png'},
        { title: '綿羊', url: 'pic2/sheep.png'},
      ],
      //number: [], // [0, 3, 1, 4, 2, 5]
      newPic: [], // pic重新排列
      ansPic: [], // 答案
      guest: [],  // 使用者點選猜測(最多18項)
      check: [],  // 提示猜對數量
      answer: {   // 當前猜測
        ans1:'',
        ans2:''
      }
    },
    computed: {
      checkLine() {
        this.check.push({
          ans1: this.answer.ans1,
          ans2: this.answer.ans2
        })
        //console.log('computed')
        return this.check
      }
    },
    methods: {
      resetHandler(){
        this.newPic = []
        this.ansPic = []
        this.guest = []
        this.check= []
        this.answer.ans1=''
        this.answer.ans2=''
  // 圖片隨機排序
        var number =[]
        while (number.length < this.pic.length) {
          var i = parseInt(Math.random()*this.pic.length)
          number.indexOf(i) == -1 ? number.push(i) : ''
        };        
        for ( var x = 0 ; x < 6 ; x++){
          this.newPic.push(this.pic[number[x]])
        };
        //console.log(this.newPic)
        
  // 隨機挑選三張圖片
        while (this.ansPic.length < 3) {
          var i = parseInt(Math.random()*6)
          var animal = this.newPic[i].title
          if (this.ansPic.indexOf(animal) == -1 ) {
            this.ansPic.push(animal)
          };
        };
        console.log(`答案：${this.ansPic}`)

        return this.newPic
      },
      clickHandler(index) {
        //console.log(this.newPic[index].title)
        var newItem = this.newPic[index].title

        if (this.guest.length < 3) {
          this.guest.slice(0,3).indexOf(newItem) == -1 ? this.guest.push(newItem) : ''
        } else if (this.guest.length < 6) {
          this.guest.slice(3,6).indexOf(newItem) == -1 ? this.guest.push(newItem) : ''
        } else if (this.guest.length < 9) {
          this.guest.slice(6,9).indexOf(newItem) == -1 ? this.guest.push(newItem) : ''          
        } else if (this.guest.length < 12) {
          this.guest.slice(9,12).indexOf(newItem) == -1 ? this.guest.push(newItem) : ''          
        } else if (this.guest.length < 15) {
          this.guest.slice(12,15).indexOf(newItem) == -1 ? this.guest.push(newItem) : ''          
        } else if (this.guest.length < 18) {
          this.guest.slice(15,18).indexOf(newItem) == -1 ? this.guest.push(newItem) : ''          
        }
        this.test()
      },
      test() {
        switch ( this.guest.length ) {
          case 3 :
            this.answerCheck(0,3)
            break;
          case 6 :
            this.answerCheck(3,6)
            break;
          case 9 :
            this.answerCheck(6,9)
            break;
          case 12 :
            this.answerCheck(9,12)
            break;
          case 15 :
            this.answerCheck(12,15)
            break;
          case 18 :
            this.answerCheck(15,18)
            break;
        }
      },
      answerCheck(range){
        this.answer.ans1=''
        this.answer.ans2=''
        var result1 = 0;
        var result2 = 0;
        if (this.guest.length % 3 === 0){
          for (i=0 ; i< 3 ; i++) {
            for (x=0 ; x<3 ; x++) {
              if (this.ansPic[i] == this.guest.slice(range)[x]){
                result1++
              }
            }
          }
        };
        for ( var y = 0 ; y<3 ; y++) {
          if(this.ansPic[y] == this.guest.slice(range)[y]) {
            result2++
          }
        };
        this.answer.ans1 = result1
        this.answer.ans2 = result2
        //console.log('answerCheck')
      },
      success() {
        if (this.answer.ans1 === 3) {
          if (this.answer.ans2 === 3){
            confirm(`答對了！人氣前三名就是：${this.ansPic.toString()}`) 
            this.resetHandler()
          }
        } else if ( this.guest.length === 18) {
          if (this.answer.ans1 !== 3){
            confirm('失敗!')
            confirm(`答案是：${this.ansPic.toString()}`)
            this.resetHandler()
          } else if (this.answer.ans2 !== 3) {
            confirm('失敗!')
            confirm(`答案是：${this.ansPic.toString()}`)
            this.resetHandler()
          }
        }
      },
      closeInfo() {
        const dom = document.querySelector('.full-screen')
        dom.classList.toggle('x')
      }
    },
    updated() {
      //console.log('update')
      this.success()
    },
    mounted() {
      this.resetHandler()
    },

  })
})(Vue)

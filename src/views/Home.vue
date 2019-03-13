<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <h1>{{apod.title}}</h1>
        <input :max="getToday()" @change="changeDate($event)" type="date" :value="apod.date">
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: "home",
   props: [],
   data() {
      return {}
   },
   computed: {
     apod() {
       /**
        * 1. get the apod from the state
        * 2. if apod is not an image than default the url to a placehodler image
        * 3. set the background image
        * 4. return the apod
        */
       let apod = this.$store.state.apod
       if (apod.media_type != 'image') {
         apod.url = 'https://lh3.googleusercontent.com/s4fBJ-Nnjm8H2AKCDgGy-cMkQRhUSnrkXNd1hnbiOMhLNIu005g6vlOCZnNvCCdVkZI'
       }
       this.setBackgroundImage(apod.url)
       return apod
     }
   },
   methods: {
     setBackgroundImage(url) {
       if (url) {
         document.querySelector('#app').style.backgroundImage = `url('${url}')`
       }
     },
     changeDate(event) {
       let date = event.target.value
       this.$store.dispatch('getApod', date)
     },
     getToday() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
        if (month < 10) {
            month = `0${month}`
        }
        let day = date.getDate()
        if (day < 10) {
            day = `0${month}`
        }
      return year + '-' + month + '-' + day
     }
   },
   components: {}
}
</script>

<style>
.home {
  color: white;
  text-shadow: 0 0 5px black;
}
</style>

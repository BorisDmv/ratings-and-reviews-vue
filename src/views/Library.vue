<template>
  <div class="library">

    <div class="navCont">
        <img style="width: 35px" src="../assets/Gamesday_logo.svg" />

        <!-- <form class="searchPanel" @submit.prevent="search"> -->
        <form class="searchPanel">
          <input class="searchInput" v-model="contentTitle" placeholder="Search By Title">
          <!-- <img class="searchIcon" src="../assets/icons8-search.svg" @click="search()"> -->
          <img class="searchIcon" src="../assets/icons8-search.svg">
        </form>
      </div>

    <div class="wrapper">
      <!-- <div class="content" v-for="game in content" :key="game.id"> -->
      <div class="content" v-for="item in filteredContent" :key="item.id">
        <img @click="$router.push({name: 'content', params: {id: item.slug}})" class="thumbnail" :src="`${item.thumbImage}`">
      </div>
    </div>

  </div>
</template>

<script>
import authService from '@/services/auth-service'

export default {
  name: "Library",
  data () {
    return{
      contentTitle: '',
      content: [{id: 1, slug: 'far-cry-6', title: 'far cry 6', thumbImage: 'https://cdn1.epicgames.com/b4565296c22549e4830c13bc7506642d/offer/TETRA_PREORDER_STANDARD%20EDITION_EPIC_Store_Landscape_2560x1440-2560x1440-827a9d1823ad230a0ea5a2efc7936370.jpg'}]
    }
  },
  methods: {
    async GetContent(){
      let res = await authService.getContent()

    },
   capitalizeTheFirstLetterOfEachWord(words) {
      var separateWord = words.toLowerCase().split(' ');
      for (var i = 0; i < separateWord.length; i++) {
          separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
          separateWord[i].substring(1);
      }
    return separateWord.join(' ');
    },
    search(){
      if(this.contentTitle != ''){
        this.$router.push(this.contentTitle.split(" ").join("-").toLowerCase())
      }
    }
  },
  mounted() {

  },
  computed: {
    // Add to the content array
    filteredContent: function(){
      return this.content.filter((item)=>{
        //console.log(this.capitalizeTheFirstLetterOfEachWord(this.contentTitle))
        return item.title.match(this.capitalizeTheFirstLetterOfEachWord(this.contentTitle))
      })
    }
  }
};
</script>

<style scoped lang="scss">

.navCont{
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.searchPanel{
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchInput{
  background: #0d1216;
  padding: 12px;
  border-radius: 10px;
  color: white;
  border: 0;

  &:focus{
    outline: var(--primary) 1.5px solid;
  }
}

.searchIcon{
  margin-left: 10px;
  width: 20px;
  cursor: pointer;

  &:active{
    transform: scale(0.96);
  }
}

.arrowIcon{
  width: 20px;
}


.title{
  margin-bottom: 30px;
}

.wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 20px;
  width: 85%;
  margin: auto;
}

.content{
  padding: 20px;
}


.thumbnail{
  width: 220px;
  border-radius: 10px;
  // border: 1px solid #707070;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover{
    transform: translateY(-6px);
  }
}

@media only screen and (max-width: 700px) {
  .title{
    font-size: 1.6rem;
  }

  .wrapper{
    width: 100%;
  }

  .content{
    flex-basis: 25%;

    img{
      width: 150px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .content{
    flex-basis: 35%;

    img{
      width: 120px;
    }
  }
}


// PAGINATION
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--greyDark);
}

ul {
  list-style-type: none;
}

.items-list {
  max-width: 90vw;
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 3rem;
  justify-content: center;
  align-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.item {
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--greyDark);
  cursor: pointer;

  span {
    background: #ffffff;
    box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
    border-radius: 0.6rem;
    padding: 2rem;
    font-size: 3rem;
    transition: all 0.3s ease;
  }

  &:hover {
    span {
      transform: scale(1.2);
      color: var(--primary);
    }
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: var(--greyLight);
  }
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin: 3rem;
  padding: 0;
  border-radius: 0.6rem;
  background: #0d1216;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);

  &__numbers,
  &__btn,
  &__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.8rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  &__dots {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--greyLight);
    cursor: initial;
  }

  &__numbers {
    width: 2rem;
    height: 2rem;
    border-radius: 0.4rem;

    &:hover {
      color: var(--primary);
    }

    &.active {
      color: #ffffff;
      background: var(--primary);
      border: 1px solid var(--primary);
    }
  }

  &__btn {
    color: var(--greyLight);
    pointer-events: none;

    &.active {
      color: var(--greyDark);
      pointer-events: initial;

      &:hover {
        color: var(--primary);
      }
    }
  }
}

</style>
<template>
  <div class="about">
      
      <div class="container">
        <div class="content">
          <div class="titleCont">
            <div class="title-date">
            <p>{{ this.game.title }}</p>
            <p>{{ this.game.releaseDate }}</p>
            </div>
          </div>
          <div class="platformsCont">
            <div v-if="this.game.win == 1">
              <img class="platforms" src="../assets/windows-logo.svg">
            </div>
            <div v-if="this.game.xbox == 1">
              <img class="platforms" src="../assets/xbox.png">
            </div>
            <div v-if="this.game.ps == 1">
              <img class="platforms" src="../assets/playstation.png">
            </div>
            <div v-if="this.game.switch == 1">
              <img class="platforms" src="../assets/nintendo-switch.png">
            </div>
          </div>
        </div>
        <div class="overlay"></div>
        <img class="banner" :src="`${this.game.bannerImage}`">
        <div class="gradient-bg"></div>
      </div>


      <div class="container2">
        <div class="leftCont">
          <div class="platformText">
            <p style="color: #DF3F53">Platforms:</p>
            <p>{{ this.game.platforms }}</p>
          </div>

          <div class="platformText">
            <p style="color: #DF3F53">Developers:</p>
            <p>{{ this.game.developers }}</p>
          </div>

          <div class="platformText">
            <p style="color: #DF3F53">Genres:</p>
            <p>{{ this.game.genres }}</p>
          </div>


          <div class="platformText">
            <p style="color: #DF3F53">Description:</p>
            <p>{{ this.game.description }}</p>
          </div>
        </div>

        <div class="rightCont">
            <a style="text-decoration: none;" :href="this.game.trailer" target="_blank"><button class="default-btn">WATCH TRAILER</button></a>
        </div>
      </div>

      <!-- Gallery -->
      <div class="galleryCont">
        <div
          v-for="(src, id) in this.game.gameImages"
          :key="id"
          class="pic"
          @click="() => showImg(id)"
        >
          <img :src="`${src}`">
        </div>
      </div>

      
      <vue-easy-lightbox
      :visible="visible"
      :imgs="`${this.game.gameImages[index]}`"
      :index="index"
      :moveDisabled=true
      @hide="handleHide"
      ></vue-easy-lightbox>


  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import authService from '@/services/auth-service'

export default {
  name: 'game',
  components: {
    VueEasyLightbox
  },
  data () {
    return{
      game:
        {
          id: '1',
          bannerImage: 'https://cdn1.epicgames.com/b4565296c22549e4830c13bc7506642d/offer/TETRA_PREORDER_STANDARD%20EDITION_EPIC_Store_Landscape_2560x1440-2560x1440-827a9d1823ad230a0ea5a2efc7936370.jpg',
          title: 'Far Cry 6',
          releaseDate: 'October 7, 2021',
          platforms: 'PC,Playstation,Xbox',
          win: 1,
          ps: 1,
          xbox: 1,
          genres: 'First Person Shooter',
          developers: 'Ubisoft',
          description: '',
          trailer: '...',
          gameImages: ['https://cdn1.epicgames.com/b4565296c22549e4830c13bc7506642d/offer/TETRA_PREORDER_STANDARD%20EDITION_EPIC_Store_Landscape_2560x1440-2560x1440-827a9d1823ad230a0ea5a2efc7936370.jpg']
        },
      //Gallery
      index: 0,
      visible: false
    }
  },
  methods: {
  
    async fetchGame(id) {
      const response = await authService.getGame(id)
    },
    //Gallery
    showImg (index) {
      this.index = index
      this.visible = true
    },
    handleHide () {
      this.visible = false
    }
  },
  mounted() {
    //this.fetchGame(this.$route.params.id);
  }
}
</script>


<style scoped lang="scss">

// .gradient-bg{
//   background: rgba(0, 0, 0, 0.3);
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   top: 0;
// }

.overlay{
  background: red;

}

.container{
  position: relative;
  width: 100%;
}

.content{
  display: flex;
  justify-content: center;
}

.titleCont{
  position: absolute;
  bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: left;
  z-index: 1;
  width: 85%;
}

.title-date{
  display: flex;
  flex-direction: column;
}

.platformsCont{
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  z-index: 1;
  width: 85%;
}

.platforms{
  width: 1.5rem;
}

.banner{
  width: 100%;
}

.library{
  margin-top: 30px;
  width: 85%;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
}

.default-btn{
  background: #DF3F53;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  color: white;
  border-radius: 10px;
  width: 166px;
  height: 45px;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover{
    transform: scale(0.98);
  }
}

.arrowIcon{
  width: 20px;
}

.container2{
  width: 85%;
  margin: 50px auto 50px auto;
  display: flex;
  justify-content: center;
}

.leftCont{
  display: flex;
  flex-direction: column;
  width: 85%;
}

.platformText{
  width: 600px;
  text-align: left;
  margin-bottom: 10px;
}

.rightCont{
  display: flex;
  justify-content: flex-end;
  width: 85%;
}

.noGamePanel{  
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-direction: column;
}

.galleryCont{
  display: flex;
  flex-wrap: wrap;
  margin: 50px auto;
  width: 85%;
  gap: 10px;


  img{
    cursor: pointer;
    height: 200px;
  }
}

@media only screen and (max-width: 1000px) {

  .banner {
    width: auto;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    height: 231px;
    position: absolute;
  }

  .library{
    justify-content: center;
  }

  .titleCont{
    flex-direction: column;
    margin-bottom: 50px;
    top: 115px;
  }

  .title-date{
    text-align:center;
  }
  
  .platformsCont{
    justify-content: center;
    top: 170px;
  }

  .platformText{
    width: auto;
    text-align: center;
  }

  .container2{
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 250px;
  }

  .rightCont{
    justify-content: center;
  }

  .galleryCont{
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .pic{
      width: 60%;
    }

    img{
      width: 100%;
      height: 100%;
    }
  }
}




</style>
<template>
    <v-app class="main-class">
        <v-app-bar
            app
            light
            color="#cafafe"
            class="navbar"
        >
            <span @click="clickItem('/')" class="fakeBtn">
                <img src="./assets/camera2.svg" width="30px" height="auto" class="mr-1"/>
                Catch My Photo
            </span>

            <span
                @click="clickItem('/photos')"
                class="ml-7 text fakeBtn"
            >
                My Photos
            </span>
        </v-app-bar>
        <error-snackbar />
        <success-snackbar />
        <v-main class="router-view">
        <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import ErrorSnackbar from "./components/ErrorSnackbar"
import SuccessSnackbar from "./components/SuccessSnackbar"

export default {
  name: 'App',
  components:{
      ErrorSnackbar,
      SuccessSnackbar
  },
  data: () => ({
    //
  }),
  methods:{
      clickItem(url){
          this.$router.push(url)
      }
  }
};
</script>

<style scoped>
    .main-class {
        font-family: 'Mali', cursive;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        /* color: #041a01; */
        margin: 0 !important;
        padding: 0 !important;
        color: #4056a1 !important;
        background-color: #cafafe !important;
    }
    .router-view{
        margin:0;
        padding: 0;
        background-color: #cafafe !important;
    }
    .navbar{
        color: #4056a1 !important;
    }

    .fakeBtn{
        font-size: 18px;
        font-weight: 600;
        text-transform: initial;
        color: #4056a1 !important;

    }
    .fakeBtn:hover{
        opacity: 0.6 ;
        cursor: pointer;
    }
</style>
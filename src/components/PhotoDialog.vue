<template>
      <v-dialog
        transition="scale-transition"
        max-width="600"
        :value="this.$store.state.photoShoot"
          >            
          <v-card color="#05386b" dark>
            <v-card-text>
                <v-row justify="between">
                    <v-col cols="6" align-self="center">
                        <v-img :src="this.$store.state.photoShoot.src"/>
                    </v-col>
                    <v-col cols="6" align-self="center">
                        DENEME2
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="closeDialog"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

</template>

<script>
  export default {
    name: 'PhotoDialog',
    methods:{
        closeDialog(){
            this.$store.commit('setPhotoShoot', null)
        },
       
    },
  }
</script>
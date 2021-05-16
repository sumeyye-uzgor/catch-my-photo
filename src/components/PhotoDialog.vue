<template>
      <v-dialog
        transition="scale-transition"
        max-width="600"
        :value="this.$store.state.photoShoot"
          >            
        <v-card color="#05386b" dark>
            <v-container>
                <v-row justify="center">
                    <v-col cols="6" justify="center">
                        <v-img :src="this.$store.state.photoShoot.src"/>
                    </v-col>
                    <v-col cols="6" justify="center">
                        <v-text-field
                        label="Name"
                        v-model="name"
                        placeholder="Placeholder"
                        outlined />
                        <v-text-field
                        label="Location"
                        v-model="location"
                        placeholder="Placeholder"
                        outlined />
                        <v-text-field
                        label="Date"
                        disabled
                        :value="date"
                        placeholder="Placeholder"
                        outlined />
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="closeDialog"
              >Close</v-btn>
                <v-btn
                text
                @click="savePhoto"
              >Save Photo</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

</template>

<script>
  export default {
    name: 'PhotoDialog',
    data(){
        return{
            date: Date().toString(),
            location: '',
            name: '',
            coordinates: [],
        }
    },
    methods:{
        savePhoto(){
            try{
                const photo = {
                    date: this.date,
                    location: this.location,
                    name: this.name,
                    coordinates: this.coordinates,
                    imageUrl: this.$store.state.photoShoot.src,
                }
                this.$store.commit('savePhoto', photo)
                this.$store.commit('setPhotoShoot', null)
                this.$store.commit('openSuccessAlert', "Photo is saved!")
            }catch(error){
                this.$store.commit('openErrorAlert', error)
            }
        },
        closeDialog(){
            this.$store.commit('setPhotoShoot', null)
        },
       
    },
  }
</script>
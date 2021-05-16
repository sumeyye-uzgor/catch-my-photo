<template>
      <v-dialog
        transition="scale-transition"
        max-width="600"
        :value="this.$store.state.photoShoot"
          >            
        <v-card color="#05386b" dark>
            <v-container>
                <v-row justify="center" align="between">
                    <v-col cols="6"  align="center" justify="center">
                        <v-img :src="this.$store.state.photoShoot.src"/>
                    </v-col>
                    <v-col cols="6" align="center" justify="center">
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
            const photo = {
                date: this.date,
                location: this.location,
                name: this.name,
                coordinates: this.coordinates,
                image: this.$store.state.photoShoot,
            }
            this.$store.commit('addPhoto', photo)
        },
        closeDialog(){
            this.$store.commit('setPhotoShoot', null)
        },
       
    },
  }
</script>
<template>
    <v-dialog
    transition="scale-transition"
    max-width="900"
    :value="this.$store.state.photoShoot"
    >
        <v-card color="#05386b" dark class="ma-0 pa-0">
            <v-container>
                <v-row justify="center">
                    <v-col cols="6" justify="center" class="canvas-wrapper">
                        <v-img :src="this.$store.state.photoShoot.src" width="250" height="250"/>
                        <canvas ref="myCanvas" class="canvas-overlay"></canvas>
                    </v-col>
                    <v-col cols="6" justify="center">
                        <v-text-field
                        label="Name"
                        v-model="name"
                        placeholder="Name"
                        outlined />
                        <v-text-field
                        label="Location"
                        v-model="location"
                        placeholder="Location"
                        outlined />
                        <v-text-field
                        label="Date"
                        disabled
                        :value="date"
                        outlined />
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                label="Start at (X)"
                                v-model="coordinates[0]"
                                outlined />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                label="Start at (Y)"
                                v-model="coordinates[1]"
                                outlined />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                label="Width"
                                v-model="coordinates[2]"
                                outlined />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                label="Height"
                                v-model="coordinates[3]"
                                outlined />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions class="justify-end">
                    <v-btn text @click="drawSquare">
                        Draw Square
                    </v-btn>
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
    mounted(){
        const imgRef = this.$refs['myCanvas']
        let ctx = imgRef.getContext('2d')
        this.canvas = ctx
        this.canvas.lineWidth = "2"
        this.canvas.beginPath()
        this.canvas.rect(...this.coordinates)
        this.canvas.strokeStyle = 'red';
        this.canvas.stroke()
    },
    data(){
        return{
            date: Date().toString(),
            location: '',
            name: '',
            coordinates: [100, 100, 50, 50],
        }
    },
    methods:{
        drawSquare(){
            this.canvas.clearRect(0,0,250,250)
            this.canvas.beginPath()
            this.canvas.rect(...this.coordinates)
            this.canvas.stroke()
            this.canvas.strokeStyle = 'red';

        },
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
<style scoped>
.canvas-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  pointer-events: none !important;
  width: 100% !important;
  height: 100 !important;
}

.canvas-wrapper {
  position: relative !important;
}
</style>
<template>
    <v-container grid-list class="ma-0 pb-16 pt-10 px-10">
        <v-flex wrap align-center justify-center>
            <v-card color="#05386b" dark class="ma-0 pa-0">
                <v-container>
                    <v-row align="center">
                        <v-col cols="6" justify="center" class="canvas-wrapper">
                            <v-img :src="photo.imageUrl" width="500" height="500"/>
                            <canvas ref="myCanvas" class="canvas-overlay"></canvas>
                        </v-col>
                        <v-col cols="6" justify="center">
                            <v-text-field
                            label="Name"
                            v-model="photo.name"
                            :disabled="!editMode"
                            placeholder="Name"
                            outlined />
                            <v-text-field
                            label="Location"
                            v-model="photo.location"
                            :disabled="!editMode"
                            placeholder="Location"
                            outlined />
                            <v-text-field
                            label="Date"
                            disabled
                            :value="photo.date"
                            outlined />
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                    label="Start at (X)"
                                    v-model="photo.coordinates[0]"
                                    :disabled="!editMode"
                                    outlined />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    label="Start at (Y)"
                                    v-model="photo.coordinates[1]"
                                    :disabled="!editMode"
                                    outlined />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                    label="Width"
                                    v-model="photo.coordinates[2]"
                                   :disabled="!editMode"
                                    outlined />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    label="Height"
                                    v-model="photo.coordinates[3]"
                                    :disabled="!editMode"
                                    outlined />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions class="justify-end">
                    <v-btn text @click="drawSquare"> Draw Square</v-btn>
                    <v-btn text @click="closePhoto">Close</v-btn>
                    <v-btn text v-if="!editMode" @click="editPhoto">Edit Photo</v-btn>
                    <v-btn text v-if="editMode" @click="savePhoto">Save Photo</v-btn>
                    <v-btn text v-if="editMode" @click="deletePhoto">Delete Photo</v-btn>
                </v-card-actions>
                
            </v-card>
    
        </v-flex>

    </v-container>

</template>
<script>

export default {
    created() {
        this.photo = this.$store.state.photos.filter(
            item => item.id===this.$route.params.id
        )[0];
        console.log(this.photo)
    },
    routeUpdated(to, from, next) {
        // Call the API query method when the URL changes
        this.photo = this.$store.state.photos.filter(
            item => item.id===this.$route.params.id
        )[0];
        console.log(this.photo)

        next();
    },
    mounted(){
        const imgRef = this.$refs['myCanvas']
        let ctx = imgRef.getContext('2d')
        this.canvas = ctx
        this.canvas.lineWidth = "2"
        this.canvas.beginPath()
        this.canvas.rect(...this.photo.coordinates)
        this.canvas.strokeStyle = 'red';
        this.canvas.stroke()
    },
    data(){
        return{
            // date: Date().toString(),
            // location: '',
            // name: '',
            // coordinates: [100, 100, 50, 50],
            editMode: false,
            photo: {},
        }
    },
    methods:{
        drawSquare(){
            this.canvas.clearRect(0,0,250,250)
            this.canvas.beginPath()
            this.canvas.rect(...this.photo.coordinates)
            this.canvas.stroke()
            this.canvas.strokeStyle = 'red';

        },
        editPhoto(){
            this.editMode = true
        },
        savePhoto(){
             try{
                this.$store.commit('editPhoto', this.photo)
                this.$store.commit('openSuccessAlert', "Photo is edited and saved!")
                this.editMode = false
            }catch(error){
                this.$store.commit('openErrorAlert', error)
            }
        },    
        deletePhoto(){
            try{
                this.$store.commit('deletePhoto', this.photo)
                this.$store.commit('openSuccessAlert', "Photo is deleted!")
                this.editMode = false
                this.$router.push('/photos')
            }catch(error){
                this.$store.commit('openErrorAlert', error)
            }
        },
        closePhoto(){
            this.$router.push('/photos')
        }
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
<template>
  <v-row justify="center" class="pt-5 pb-10 ma-0">
      <v-col cols="12" align="center">
        <v-row justify="center">
            <h1>
                <img src="../assets/camera2.svg" width="30px" height="auto" class="mr-1"/>
                Catch My Photo
            </h1>
        </v-row>
        <v-row justify="center" class="mt-5">
            <v-btn type="button" :class="{ 'blue darken-4' : !this.$store.state.isCameraOpen, 'red darken-4' : this.$store.state.isCameraOpen}" @click="toggleCamera">
                <span v-if="!this.$store.state.isCameraOpen">Open Camera</span>
                <span v-else>Close Camera</span>
            </v-btn>
        </v-row>
        <v-row v-show="this.$store.state.isCameraOpen && isLoading" justify="center" class="mt-16">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </v-row>

        <v-row v-if="this.$store.state.isCameraOpen" v-show="!isLoading" justify="center" class="mt-10">
            <!-- <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div> -->
            <video ref="camera" :width="450" :height="337.5" autoplay></video>
            <canvas v-show="false" ref="canvas"></canvas>
        </v-row>
        <v-row v-if="this.$store.state.isCameraOpen && !isLoading" justify="center" class="mt-7">
            <button type="button" class="button" @click="takePhoto">
                <img src="../assets/camera2.svg" width="50px" height="auto" class="mr-1"/>
            </button>
        </v-row>

        <v-row v-if="this.$store.state.isCameraOpen && !isLoading" justify="center" class="mt-7">
            <photo-dialog v-if="this.$store.state.photoShoot"/>
        </v-row>
                
  
                <!-- <v-row v-if="isPhotoTaken && this.$store.state.isCameraOpen" class="camera-download" justify="center">
                    <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                    Download
                    </a>
                </v-row> -->

      </v-col>
  </v-row>
</template>

<script>
import PhotoDialog from '../components/PhotoDialog.vue';
    export default {
        name: 'Home',
        components: {
            PhotoDialog,
        },
        data() {
            return {
                isPhotoTaken: false,
                isShotPhoto: false,
                isLoading: false,
                link: '#'
            }
        },
        updated(){
            if(!this.$store.state.isCameraOpen) {
                this.stopCameraStream();
            }
        },
        created(){
            if(!this.$store.state.isCameraOpen) {
                this.stopCameraStream();
            }
        },    
        methods: {
            toggleCamera() {
                    if(this.$store.state.isCameraOpen) {
                        this.$store.commit('setIsCameraOpen', false)
                        this.isPhotoTaken = false;
                        this.isShotPhoto = false;
                        this.stopCameraStream();
                    } else {
                        this.createCameraElement();
                        this.$store.commit('setIsCameraOpen', true)

                    }
            },
                
            createCameraElement() {
                this.isLoading = true;
                    
                const constraints = (window.constraints = {
                    audio: false,
                    video: true
                });


                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(stream => {
                            this.isLoading = false;
                            this.$refs.camera.srcObject = stream;
                    })
                    .catch(() => {
                        this.isLoading = false;
                        alert("May the browser didn't support or there is some errors.");
                    });
            },
    
            stopCameraStream() {
                let tracks = this.$refs.camera.srcObject.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
            },
                    
            takePhoto() {
                if(!this.isPhotoTaken) {
                    this.isShotPhoto = true;

                    const FLASH_TIMEOUT = 50;

                    setTimeout(() => {
                    this.isShotPhoto = false;
                    }, FLASH_TIMEOUT);
                }
                this.isPhotoTaken = !this.isPhotoTaken;
                let canvas = this.$refs.canvas;     
                let video = this.$refs.camera;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

                // const playImage = new Image();
                // playImage.src = 'path to image asset';
                // playImage.onload = () => {
                //     const startX = (video.videoWidth / 2) - (playImage.width / 2);
                //     const startY = (video.videoHeight / 2) - (playImage.height / 2);
                //     canvas.getContext('2d').drawImage(playImage, startX, startY, playImage.width, playImage.height);
                //     canvas.toBlob((blob) => {
                //         const img = new Image();
                //         img.src = window.URL.createObjectUrl(blob);
                //     })
                // };
                let image = new Image();
                image.src = canvas.toDataURL();
                this.$store.commit("setPhotoShoot", image)
                this.$store.commit("addPhoto", image)
            },
                    
            // downloadImage() {
            //     const download = document.getElementById("downloadPhoto");
            //     const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
            //     .replace("image/jpeg", "image/octet-stream");
            //     download.setAttribute("href", canvas);
            // }
        },
    }
</script>
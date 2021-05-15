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
            <v-btn type="button" :class="{ 'blue darken-4' : !isCameraOpen, 'red darken-4' : isCameraOpen}" @click="toggleCamera">
                <span v-if="!isCameraOpen">Open Camera</span>
                <span v-else>Close Camera</span>
            </v-btn>
        </v-row>
        <v-row v-show="isCameraOpen && isLoading" justify="center" class="mt-16">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </v-row>

        <v-row v-if="isCameraOpen" v-show="!isLoading" justify="center" class="mt-10">
            <!-- <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div> -->
            <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
            <!-- <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas> -->
        </v-row>

        <v-row v-if="isCameraOpen && !isLoading" justify="center" class="mt-7">
            <photo-button />
        </v-row>
                
  
                <!-- <v-row v-if="isPhotoTaken && isCameraOpen" class="camera-download" justify="center">
                    <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                    Download
                    </a>
                </v-row> -->

      </v-col>
  </v-row>
</template>

<script>
import PhotoButton from '../components/PhotoButton.vue';
    export default {
        name: 'Home',
        components: {
            PhotoButton,
        },

        data() {
            return {
                isCameraOpen: false,
                isPhotoTaken: false,
                isShotPhoto: false,
                isLoading: false,
                link: '#'
            }
        },
        
        methods: {
            toggleCamera() {
                    if(this.isCameraOpen) {
                        this.isCameraOpen = false;
                        this.isPhotoTaken = false;
                        this.isShotPhoto = false;
                        this.stopCameraStream();
                    } else {
                        this.isCameraOpen = true;
                        this.createCameraElement();
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
                    
                const context = this.$refs.canvas.getContext('2d');
                context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
            },
                    
            downloadImage() {
                const download = document.getElementById("downloadPhoto");
                const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
                .replace("image/jpeg", "image/octet-stream");
                download.setAttribute("href", canvas);
            }
        },
    }
</script>
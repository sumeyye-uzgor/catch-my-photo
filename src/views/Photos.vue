<template>
    <v-row justify="center" align="center" class="ma-0 pb-16 pt-10">
        <v-col cols="8" v-if="this.$store.state.photos">
            <v-carousel delimiter-icon>
                <v-carousel-item
                v-for="(photo, i) in this.$store.state.photos"
                :key="i"
                :src="photo.src"
                >
                </v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col cols="12" v-else>
            <h1>There is no photo catched!</h1>
        </v-col>
    </v-row>
</template>
<script>

export default {
    mounted(){
        this.$store.commit('setIsCameraOpen', false)
        console.log(this.$store.state.isCameraOpen)
    }
}

</script>

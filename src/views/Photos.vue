<template>
    <v-row justify="center" align="center" class="ma-0 pb-16 pt-10">
        <v-col cols="6" v-if="this.$store.state.photos">
            <v-card
                color="#05386b" dark
                v-for="(photo, i) in this.$store.state.photos"
                :key="i"
                >
                <v-img :src="photo.image.src"/>
                <v-card-text>
                    <v-text-field disabled value="photo.name" label="Name" outlined />
                    <v-text-field disabled value="photo.location" label="Location" outlined />
                    <v-text-field disabled value="photo.coordinates" label="Coordinates" outlined />
                    <v-text-field disabled value="photo.date" label="Dates" outlined />
                </v-card-text>
                <v-card-actions justify="end">
                    <v-btn>Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="6" v-if="this.$store.state.photos">
            <v-carousel delimiter-icon>
                <v-carousel-item
                v-for="(photo, i) in this.$store.state.photos"
                :key="i"
                :src="photo.image.src"
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

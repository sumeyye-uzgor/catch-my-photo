<template>
    <v-container grid-list class="ma-0 pb-16 pt-10">
        <v-flex wrap align-center justify-center>
        <v-row v-if="this.$store.state.photos.length>0" align="between">
            <v-col justify="center" cols="4" v-for="(photo) in this.$store.state.photos" :key="photo.id">
                <v-card
                    class="pa-10"
                    color="#05386b" dark>
                    <v-img :src="photo.imageUrl"/>
                    <v-card-text>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <!-- <v-btn>Edit</v-btn> -->
                        <v-btn @click="clickLink(photo.id)">Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else align="center">
            <v-col justify="center" >
            <h1>There is no photo catched!</h1>
                
            </v-col>
        </v-row>
    
    </v-flex>

    </v-container>

</template>
<script>

export default {
    methods:{
        clickLink(id){
            console.log(id)
            this.$router.push(`/photos/${id}`)
        }
    }
}

</script>

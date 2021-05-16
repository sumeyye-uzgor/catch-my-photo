<template>
    <v-container  class="ma-0 pb-16 pt-10">
        <v-row v-if="this.$store.state.photos" class="pl-10">
            <v-col cols="4" v-for="(photo) in this.$store.state.photos" :key="photo.id">
                <v-card
                    class="pa-10"
                    color="#05386b" dark>
                    <v-img :src="photo.imageUrl"/>
                    <v-card-text>
                        <v-text-field disabled :value="photo.name" label="Name" outlined />
                        <v-text-field disabled :value="photo.location" label="Location" outlined />
                        <v-text-field disabled :value="photo.coordinates" label="Coordinates" outlined />
                        <v-text-field disabled :value="photo.date" label="Dates" outlined />
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn>Edit</v-btn>
                        <v-btn>Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else align="center">
            <v-col justify="center" >
            <h1>There is no photo catched!</h1>
                
            </v-col>
        </v-row>
 

    </v-container>

</template>
<script>

export default {

}

</script>

import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage,
//     reducer: (state) => ({
//         photos: state.photos,
//     }),
// })

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        photoShoot: null,
        photos: null,
        isCameraOpen: false,
    },
    mutations: {
        setPhotoShoot: (state, value) => {
            state.photoShoot = value
        },
        addPhoto: (state, value) => {
            const oldPhotos = state.photos ? state.photos : []
            state.photos = [...oldPhotos, value]
        },
        setIsCameraOpen: (state, value) => {
            state.isCameraOpen = value
        }
    },
    actions: {
    },
    modules: {
    },
    // plugins: [vuexLocal.plugin]
})

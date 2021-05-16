import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/dist/v4'
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
        isSuccessAlert: false,
        isErrorAlert: false,
        message: '',
    },
    mutations: {
        setPhotoShoot: (state, value) => {
            state.photoShoot = value
        },
        closeCartAlert: (state) => {
            state.isCartAlert = false
        },
        openErrorAlert: (state, value) => {
            state.isErrorAlert = true
            state.message = value
            setTimeout(() => {
                state.isErrorAlert = false
            }, 3000)
        },
        closeErrorAlert: (state) => {
            state.isErrorAlert = false
        },
        openSuccessAlert: (state, value) => {
            state.isSuccessAlert = true
            state.message = value
            setTimeout(() => {
                state.isSuccessAlert = false
            }, 3000)
        },
        closeSuccessAlert: (state) => {
            state.isSuccessAlert = false
        },
        savePhoto: (state, value) => {
            const oldPhotos = state.photos ? state.photos : []
            const photo = {
                id: uuid(),
                ...value,
            }
            state.photos = [...oldPhotos, photo]
        },
        editPhoto: (state, value) => {
            const newPhotos = state.photos.map(
                photo => {
                    if (photo.id === value.id) {
                        return ({
                            ...photo,
                            name: value.name,
                            date: value.date,
                            location: value.location,
                            coordinates: value.coordinates,
                        })
                    }
                    else {
                        return photo
                    }
                }
            )
            state.photos = [...newPhotos]
        },
        deletePhoto: (state, value) => {
            const newPhotos = state.photos.filter(photo => photo.id !== value.id)
            state.photos = [...newPhotos]
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

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from "./mutations"

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        photos: state.photos,
    }),
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        photoShoot: null,
        photos: null,
        isCameraOpen: false,
        isSuccessAlert: false,
        isErrorAlert: false,
        message: ''
    },
    mutations,
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin]
})

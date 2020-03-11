import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexPersistence from 'vuex-persist';

// models
import Widget from './models/Widget';

// modules
import settingsModule from './modules/settings/index';

Vue.use(Vuex);

// Create a new database instance.
const database = new VuexORM.Database();
// Register Models to the database.
database.register(Widget);

// Persisting
const {localStorage} = global;

const vuexLocal = new VuexPersistence({
    storage: localStorage
});

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        settings: settingsModule
    },
    plugins: [
        VuexORM.install(database),
        vuexLocal.plugin
    ]
});

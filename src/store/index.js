import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';

// models
import Widget from './models/Widget';

Vue.use(Vuex);

// Create a new database instance.
const database = new VuexORM.Database();
// Register Models to the database.
database.register(Widget);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    plugins: [
        VuexORM.install(database)
    ]
});

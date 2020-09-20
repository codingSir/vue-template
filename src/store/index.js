import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import home from './home';
import permission from './app/permission'

Vue.use(Vuex);

let modules = {
    ...home,
    permission
};

export default new Vuex.Store({
    state: {
        groups: [1],
    },
    modules,
    actions,    // 根级别的 action
    mutations,  // 根级别的 mutations
    // 根级别的 getters
    getters: Object.assign(getters,{
        getGroups(state) {
            return state.groups
        }
    })
})

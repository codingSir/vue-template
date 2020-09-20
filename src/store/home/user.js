import * as types from '@/store/mutation-types.js';
import {rankGender} from "@/api/common";
import { asyncRouterMaps } from '@/router/router.config.js'

export default {
    state: {
        userInfo: '123',
        rank: {},
        permissionList:[]
    },
    getters: {
        getUserInfo: (state) => {
            const { userInfo } = state;
            return `${userInfo} 111`;
        },
    },
    actions: {
        changeUserInfo({commit}, info) {
            let userInfo = `this is ${info}`;
            commit(types.SET_USER_INFO, userInfo);
        },
        async getRank({commit}, opts) {
            try {
                const res = await rankGender(opts);
                if (res) {
                    commit(types.SET_RANK, res);
                }
            } catch (e) {
                console.log(e)
            }
        },
        // 获取用户信息
        GetPermissionList({ commit }) {
            return new Promise((resolve, reject) => {

                    commit('SET_PERMISSIONLIST', asyncRouterMaps);

                    resolve(asyncRouterMaps)
            })
        },
    },
    mutations: {
        [types.SET_PERMISSIONLIST]: (state, permissionList) => {
            state.permissionList = permissionList
        },
        [types.SET_USER_INFO](state, userInfo) {
            state.userInfo = userInfo;
        },
        [types.SET_RANK](state, rank) {
            state.rank = rank;
        },
    },
};

import Vue from 'vue'
const getters = {
    permissionList: state => state.user.permissionList,
    addRouters: state => state.permission.addRouters
}

export default getters
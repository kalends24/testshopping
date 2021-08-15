// import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'
// export default {
//     [ADD_COUNTER](state, payload) {
//         payload.count++
//     },
//     [ADD_TO_CART](state, payload) {
//         state.cartList.push(payload)
//     }
// }
const mutations = {
    addCart(state, info) {
        return new Promise((resolve, reject) => {
            // 1.查看是否添加过
            const oldInfo = state.cartList.find(item => item.iid === info.iid)
            // 2.+1或者新添加
            if (oldInfo) {
                oldInfo.count += 1
                resolve('1')
            } else {
                info.count = 1
                info.checked = true
                state.cartList.push(info)
                resolve('2')
            }
        })
    }
}

export default mutations


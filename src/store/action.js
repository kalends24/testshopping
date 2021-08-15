import { ADD_COUNTER, ADD_TO_CART } from './mutations-type'
export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                context.commit([ADD_COUNTER], oldProduct)
                resolve('2')

            } else {
                payload.count = 1
                context.commit([ADD_TO_CART], payload)
                resolve('1')
            }
        })
    }

}
// const actions = {

// }

// export default actions


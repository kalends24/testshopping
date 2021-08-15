import {
    debounce
} from 'common/utils'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListenerl: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
}
import Vue from 'vue'
import Vuex from 'vuex'
import modultCart from '@/store/cart.js'
import modultUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_cart: modultCart,
    m_user: modultUser
  }
})

export default store

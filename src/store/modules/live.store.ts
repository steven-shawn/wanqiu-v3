const SET_ROOM_ID = 'SET_ROOM_ID'
const ROOM_ID = '__ROOM_ID__'

const liveStore = {
    namespaced: true,
    state: {
        room_id: localStorage.getItem(ROOM_ID) || '', // 房间id
    },
    mutations: {
        [SET_ROOM_ID](state:any, id: number) {
            state.room_id = id
            localStorage.setItem(ROOM_ID, id + '')
        }
    },
    actions: {
        // async [SET_LEGUES]({ commit, state }) {
        //     if (!state.inited) {
        //         const data = await _league()
        //         commit(SET_LEGUES, data)
        //     }
        // }
    }
}

export {
    SET_ROOM_ID
}
export default liveStore
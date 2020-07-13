import {
   DOWNLOAD_FILE_S,
   FOUND,
   SET_LOADING
} from '../types'
export default (state, action) => {
    switch (action.type) {

        case DOWNLOAD_FILE_S: {
            return {
                ...state,
                files:action.payload
            }
        }

        case FOUND:{
            return{
                ...state,
                sols:action.payload

            }
        }
        case SET_LOADING: {
            return {
                ...state,
                assignload: action.payload
            }
        }
        default:
            return state

    }
}
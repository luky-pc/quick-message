import {actionTypes} from "../action/actionTypes";

export const sendMessage=(message)=>({
        type:actionTypes.SEND_MESSAGE,
        message
    }
);
export const receiveMessage=(message)=>({
        type:actionTypes.RECEIVE_MESSAGE,
        message
    }
);

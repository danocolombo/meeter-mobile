export default function meeter(state = [], action) {
    switch (action.type) {
        case 'GET_VERSION':
            return state.concat([action.text]);
        default:
            return state;
    }
}

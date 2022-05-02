// import axios from 'axios';
// import { GOOGLE_AUTH, GOOGLE_API_KEY } from '@env';

// async function authenticate(mode, email, password) {
//     const url = `${GOOGLE_AUTH}:${mode}?key=${GOOGLE_API_KEY}`;

//     const response = await axios.post(url, {
//         email: email,
//         password: password,
//         returnSecureToken: true,
//     });

//     //console.log(response.data);
//     const token = response.data.idToken;
//     return token;
// }

// export function createUser(email, password) {
//     return authenticate('signUp', email, password);
// }

// export function login(email, password) {
//     return authenticate('signInWithPassword', email, password);
// }

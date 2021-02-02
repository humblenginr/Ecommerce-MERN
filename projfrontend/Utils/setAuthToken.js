
export const setAuthToken = (token) => {
    if(typeof window !== 'undefined'){
        localStorage.jwt = token;
    }
}
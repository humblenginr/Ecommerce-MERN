export const isAuthenticated = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.jwt) return JSON.parse(localStorage.jwt);
        return false;
    }   
    return false; 
}
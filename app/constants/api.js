export const instance = axios.create({
    baseURL: "https://64b21450062767bc4826cf02.mockapi.io/api/v1"
});
const getAPIInstance = () => axios.create({
    baseURL: "https://64b21450062767bc4826cf02.mockapi.io/api/v1"
    //baseURL: "https://64b7926d21b9aa6eb0787194.mockapi.io/api/v1"
});
export {getAPIInstance};
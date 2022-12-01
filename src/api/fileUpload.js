import axios from "axios";


export const upload = axios.create({
  baseURL:  `https://dev-layf.vac.az/api/`,
  headers: { "Content-Type": "multipart/form-data" },
});



upload.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("access_token");
                window.location.reload();
            } else {
                console.log('xeta')
            }
            return Promise.reject(error);
        }
    }
);

export default upload;

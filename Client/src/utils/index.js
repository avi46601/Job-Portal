import axios from 'axios'

const API_URL ="http://localhost:5000/api";

export const API =axios.create({
    baseURL:API_URL,
    responseType:"json",
})

export const apiRequest = async ({url, token, data, method})=>{
    try {
        const result = await API(url,{
            method:method || "get",
            data:data,
            headers:{
                "Content-Type":"application/json",
                Authorization: token ? `Bearer ${token}` :"",
            }
        })
    } catch (error) {
        
    }
}

export const handleFileUpload = async (uploadFile)=>{
    const formData =new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_present","jobFinder");

    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dy1i08lpr/image/upload",formData);
        return response.data.secure_url;
    } catch (error) {
        console.log(error)
    }
}
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
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const handleFileUpload = async (uploadFile)=>{
    const formData =new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_preset","JobFinder");
    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dy1i08lpr/image/upload",formData);
        return response.data.secure_url;
    } catch (error) {
        console.log(error)
    }
}


export const updateUrl = ({ pageNum,
    query,
    cmpLoc,
    sort,
    navigate,
    location,
    jType,
    exp}) =>{
   
     const params =new URLSearchParams();
     if(pageNum && pageNum >1){
        params.set("page",pageNum)
     }
     if(query){
        params.set("query",query)
     }
     if(cmpLoc){
        params.set("cmpLoc",cmpLoc)
     }
     if(sort){
        params.set("sort",sort)
     }
     if(jType){
        params.set("jType",jType)
     }
     if(exp){
        params.set("exp",exp);
     }
     const newUrl =`${location.pathname}?${params.toString()}`;
     navigate(newUrl,{replace:true});
     return newUrl
}
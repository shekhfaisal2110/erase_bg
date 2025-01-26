let fileInput=document.querySelector("#filePicker");
let innerImage=document.querySelector(".innerUploadImg");
let image=null;

let inputImg=document.querySelector("#inputImg");
let icon=document.querySelector(".icon");
let span=document.querySelector(".span");
let url=null;

let uploadBtn=document.querySelector("#uploadBtn");
let originalImg=document.querySelector(".resultImg1 img");
let generatedImg=document.querySelector(".resultImg2 img");

let style2=document.querySelector(".style2");
let resultPage=document.querySelector(".result");
let loading=document.querySelector("#loading");

let Download=document.querySelector("#Download");
let reset=document.querySelector("#reset");

// handle upload image 
function handleUpload(){
    const apiKey="JuMERnxxsMCWBJY4rFuYGZty";
    const formData=new FormData();
    formData.append("image_file",image);
    formData.append("size","auto");
    fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": apiKey },
        body: formData,
      })
    .then(function(response){
        //binary form
        return response.blob();
    })
    .then(function(blob){
        style2.style.display="none";
        resultPage.style.display="flex";
        loading.style.display="none";
        url=URL.createObjectURL(blob);
        generatedImg.src=url;
    })
    .catch(alert())
}


innerImage.addEventListener("click",()=>{
    fileInput.click();
});

//image add using a file input tag
fileInput.addEventListener("change",()=>{
    image=fileInput.files[0];
    if(!fileInput)return;
    //image source
    let reader=new FileReader();
    reader.onload=(e)=>{
        inputImg.src=`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`;
        inputImg.style.display="block";
        //image show that time hidden a icon and text
        icon.style.display="none";
        span.style.display="none";
        originalImg.src=`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`
    }
    reader.readAsDataURL(image);
});

// upload button 
uploadBtn.addEventListener("click",()=>{
    handleUpload();
    loading.style.display="block";
})

// Download button 
function download(){
    fetch(url)
    .then(res=>res.blob())
    .then(file=>{
        let a=document.createElement("a");
        a.href=URL.createObjectURL(file);
        a.download=new Date().getTime();
        a.click();
    })
    .catch();
}
Download.addEventListener("click",()=>{
    download();
})

// reset button 
reset.addEventListener("click",()=>{
    window.location.reload();
})
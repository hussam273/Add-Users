const imagePreview = document.getElementById("imagePreview");
const imagePicker = document.getElementById("image");

imagePicker.addEventListener("change",function(){
    const files = imagePicker.files;
    if(!files || files.length === 0){
        imagePreview.style.display = "none";
        return
    }
    const pickedFile = files[0];
    imagePreview.src = URL.createObjectURL(pickedFile);
    imagePreview.style.display = "block";
})
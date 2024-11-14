const form = document.querySelector("form"),
      fileInput = form.querySelector("input[type='file']"),
      progressArea = document.querySelector('.progress-area'),
      uploadedArea = document.querySelector('.uploaded-area');

form.addEventListener('click', () => {
    fileInput.click();
});

fileInput.onchange =  ({target}) => {
    let file = target.files[0];
    if(file) {
        let fileName = file.name;
        if(fileName.length >= 12) {
            let splitName = fileName.split('.') ;
            fileName = splitName[0].substring(0,12) + "... ." + splitName[1] ;
        }
        uploadFile(fileName);
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/upload.php");
    xhr.upload.addEventListener("progress", ({loaded, total}) => {
        let fileLoaded = Math.floor((loaded / total) * 100) ;
        let fileTotal = Math.floor(total/1000) ;
        let fileSize ;
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded/(1024*1024)).toFixed(2) + " MB" ;
        
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${name} &#183; Uploading</span>
                                        <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${fileLoaded}%"></div>
                                    </div>
                                </div>                        
                            </li>`;
            // uploadedArea.innerHTML = "" ;
            progressArea.innerHTML = progressHTML ;
            if(loaded == total ) {
                progressArea.innerHTML = "" ;
                let uploadedHTML = `<li class="row">
                                <div class="content">
                                    <i class="fas fa-file-alt"></i>
                                    <div class="details">
                                        <span class="name">${name} &#183; Uploaded</span>
                                        <span class="size">${fileSize}</span>
                                    </div>
                                </div>
                                <i class="fas fa-check"></i>
                            </li>`;
                // uploadedArea.innerHTML = uploadedHTML ;
                uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML) ;
            }     
    });
    
    let formData = new FormData(form); // Corrected case
    xhr.send(formData);
}

















// const form = document.querySelector("form"),
//       fileInput = form.querySelector("input[type='file']"), // Ensure the correct selector for file input
//       progressArea = document.querySelector('.progress-area'),
//       uploadedArea = document.querySelector('.uploaded-area');

// form.addEventListener('click', () => {
//     fileInput.click();
// });

// fileInput.onChange = ({target})=>{
//     let file = target.files[0] ;
//     if(file) {
//         let fileName = file.name ;
//         uploadFile(fileName) ;
//     }
// }

// function uploadFile(name){
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "php/upload.php");
//     xhr.upload.addEventListener("progress", e =>{
//         console.log(e);
//     } );
//     let  formData = new formData(form);
//     xhr.send(formData) ;
    
// }


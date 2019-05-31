import { imgFileToBase64 , base64ToBlob , base64ToFile, imgCompress } from '../lib/index' 

const inputFile = document.getElementById('input');
inputFile.addEventListener('change',()=>{
    imgFileToBase64(inputFile.files[0]).then(res => {
        const base64Instant = document.getElementById('imgFileToBase64');
        base64Instant.innerText = res
        console.log({
            base64ToBlob:base64ToBlob(res),
            base64ToFile: base64ToFile(res,'111.jpg')
        })
        document.getElementById('originImg').src = res
        document.getElementById('originSize').innerText = 'origin size : '+inputFile.files[0].size + 'kb'
        
    }).catch((err) => {
        throw err
    });
    imgCompress({
        mode: 'auto',
        dataSrouce: inputFile.files[0],
        dataSrouceType: 'file',
        quality: 0.8
    }).then(res => {
        document.getElementById('compressImg').src = res
        // get compress size
        let str = res.substring(22)
        let equalIndex = str.indexOf('=');
        if(str.indexOf('=')>0){
            str=str.substring(0,equalIndex);
        }
        let imgLength = str.length
        document.getElementById('compressSize').innerText = 'compress size : '+parseInt(imgLength-(imgLength/8)*2) + 'kb'
    }).catch(err => {
        throw err
    });
})
/**
 * base64 to blob
 *
 * @export
 * @param {string} urlData
 * @returns {Blob}
 */
export function base64ToBlob(urlData){
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    var bytes = window.atob(arr[1]);
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
        type: mime
    });
}
/**
 * img file to base64
 *
 * @export
 * @param {*} file input's select file
 * @returns Promise
 */
export function imgFileToBase64(file){
    return new Promise((resolve,reject) => {
        try {
            let reader = new FileReader();
            reader.onload = e => {
                let base64Img = e.target.result;
                resolve(base64Img);
            }
            reader.readAsDataURL(file);
        } catch (err) {
            reject(err);
        }
    })
}

/**
 * base64 to file
 * @param dataurl  base64 Code
 * @param filename  file name
 * @returns {File}
 */
export function base64ToFile(dataurl, filename){
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

/**
 *
 *
 * @export
 * @param mode Picture compression mode:auto(Compression in equal proportion to maximum width or height) width(Compression by width) height(Compression by height)
 * @param dataSrouce Data srouce, passing:image/base64/canvas/img file
 * @param dataSrouceType Data srouce type: image/base64/canvas/file
 * @param maxWidth Maximum width of compression,default: 1080
 * @param maxHeight Maximum height of compression,default: 1080
 * @param quality Picture output quality;Range of values: 0-1 ;default: 0.92;It's useing canvas function:toDataUrl;
 * @returns Promise
 */
export function imgCompress({mode="auto",dataSrouce,dataSrouceType,maxWidth=0,maxHeight=0,quality=0.92}){
    /**
     * draw canvas
     *
     * @param {*} img
     * @param {*} offsetWidth
     * @param {*} offsetHeight
     * @param {*} realWidth
     * @param {*} realHeight
     * @returns
     */
    const _drawToCanvas = (img,offsetWidth,offsetHeight,realWidth,realHeight) => {
        return new Promise((resolve,reject) => {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = offsetWidth;
                canvas.height = offsetHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(
                    img,
                    0,0,
                    realWidth,
                    realHeight,
                    0,0,
                    offsetWidth,
                    offsetHeight
                );
                const base64str = canvas.toDataURL("image/jpeg",quality);
                resolve(base64str);
            } catch (err) {
                reject(err);
            }
        })
    }
    /**
     * check img compress size
     *
     * @param {*} img
     * @returns
     */
    const _getResizeSizeImg = (img) => {
        const originImgWidth = img.width;
        const originImgHeight = img.height;
        const percentScale = parseFloat(originImgWidth / originImgHeight);
        if(originImgWidth <= 1080 && originImgHeight <= 1080){
            return {width:originImgWidth , height:originImgHeight};
        }
        if(mode == "auto"){
            let autoWidth = maxWidth == 0 ? 1080 : maxWidth;
            let autoHeight = maxHeight == 0 ? 1080 : maxHeight;
            let sizeByMaxWidth = {
                width: autoWidth,
                height: parseInt(autoWidth / percentScale)
            };
            let sizeByMaxHeight = {
                width: parseInt(autoHeight / percentScale),
                height: autoHeight,
            };
            if(sizeByMaxHeight.height <= maxWidth){
                return sizeByMaxHeight
            }
            return sizeByMaxWidth
        }else if(mode == "width"){
            if(originImgWidth <= maxWidth){
                return { originImgWidth , originImgHeight };
            }
            let autoWidth = maxWidth == 0 ? 1080 : maxWidth;
            let sizeByMaxWidth = {
                width: autoWidth,
                height: parseInt(autoWidth / percentScale)
            };
            return sizeByMaxWidth;
        }else {
            if(originImgHeight <= maxHeight){
                return { originImgWidth , originImgHeight };
            }
            let autoWidth = maxHeight == 0 ? 1080 : maxHeight;
            let sizeByMaxHeight = {
                width: parseInt(autoWidth / percentScale),
                height: maxHeight,
            };
            return sizeByMaxHeight
        }
    }
    return new Promise((resolve,reject) => {
        let originImage = new Image();
        originImage.onload = () => {
            const finalSize = _getResizeSizeImg(originImage);
            _drawToCanvas(originImage,finalSize.width,finalSize.height,originImage.width,originImage.height).then(res => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            });
        };
        // switch all external incoming types to Base64
        if(dataSrouceType == "img" || dataSrouceType == "image"){
            originImage.src = dataSrouce.src;
        }else if(dataSrouceType == "base64"){
            originImage.src = dataSrouce;
        }else if(dataSrouceType == "canvas"){
            originImage.src = dataSrouce.toDataUrl("image/jpeg");
        }else if(dataSrouceType == "file"){
            imgFileToBase64(dataSrouce).then(res => {
                originImage.src = res;
            }).catch(err => {
                throw err
            });
        }else{
            console.log('unknow type:'+dataSrouceType)
            reject('unknow type:'+dataSrouceType)
        }
    })
}
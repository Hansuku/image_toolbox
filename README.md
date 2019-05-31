# 🔧image_toolbox
Web图片工具箱，提供压缩、编码、转换等函数。

[Here's demo](https://hansuku.github.io/image_toolbox/demo/dist/)

> 由于内部使用`new Image()`仅支持在网页环境中使用;小程序/uni-app 等不支持。由于内部使用`Promise`，为保证兼容的情况下您的工程需要有打包工具。

### 📦安装
```
npm i image_toolbox
```
### 💻功能
#### base64ToBlob
传入 base64 格式的图像转 blob 对象
通常我们使用这个方法来把 base64的 图片上传至服务器
```
import { base64Image } from 'image_toolbox';

var fd = new FormData()
fd.append('image', base64ToBlo(base64Image), "image.jpg")
let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
axios({
    method: 'POST',
    url: '/api-cloud/file-upload',
    data: fd,
    config,
}).then(res => {
    // coding...
})
```
#### imgFileToBase64
传入 input 选择的图片文件来转 base64 图片
```
import { imgFileToBase64 } from 'image_toolbox';

imgFileToBase64(dataSrouce).then(res => {
    originImage.src = res;
}).catch(err => {
    throw err
});
```
#### base64ToFile
传入 base64 格式的图像和文件名转换成图片文件对象
```
import { base64ToFile } from 'image_toolbox';

let img = base64ToFile(res,'test.jpg')
```
#### imgCompress

图片压缩器，返回一个 base64 格式的图片
- mode: auto/width/height 默认为 auto ;auto(根据最大宽度或高度等比压缩) width(根据宽度来判断是否需要等比压缩) height(根据高度判断是否需要等比压缩)
- dataSrouce: 数据源 可传入 image对象 / base64字符串 / canvas对象 / file 对象
- dataSrouceType 数据源类型 image / base64 / canvas / file
- maxWidth 可接受压缩的最大宽度 如果只传高度不传宽度则默认为 height 模式 如果不传则默认为 1080
- maxHeight 可接受压缩的最大高度 如果只传宽度不传高度则默认为 width 模式 如果不传则默认为 1080
- quality 图片输出质量，取值范围 0-1 默认为 0.92 在 canvas 的 toDataUrl 中使用
```
import { imgCompress } from 'image_toolbox';

imgCompress({
    mode: 'auto',
    dataSrouce: inputFile,
    dataSrouceType: 'file',
    quality: 0.8
}).then(res => {
    // coding...
}).catch(err => {
    throw err
});
```
### 😁最佳实践
**图片压缩尽量放在服务端做**，只有当不得已的时候比如弱网环境上传速度慢容易导致请求挂掉、服务端限制大小等等情况，才使用 `imgComporess`，前端的图片压缩算法可定制程度太低、效率慢是硬伤。

**默认对 1080 以上图片压缩这个参数是可配置的**，如果想要更加的省事，可以通过修改源码来调整默认阈值。

**宽高影响图片在大小设备上输出的清晰度，quality 会直接影响图片最后输出质量**，无论宽高多大都会使画面失真，所以我们建议`quality`最小提供到 0.8


> 这个仓库将会基于业务持续更新一些图片工具🌼🌼🌼
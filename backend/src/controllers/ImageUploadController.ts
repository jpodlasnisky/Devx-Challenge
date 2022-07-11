const cloudinary = require('../config/cloudinary.config')

export default class ImageUploadController {

  async create(images: any) {
    let urls: string[] = [];

    for (const image of images) {

      try {
        await cloudinary.uploader.upload(image.path, { public_id: `teste/${image.filename}`, tags: `teste` }, (error: any, result: any) => {
          if (error) {
            return
          }
          urls.push(result.url);
        })
      } catch (error) {
        console.error(error)
      }
    }

    return urls
  }

}

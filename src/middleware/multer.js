import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("storage, dest")
        cb(null, '/public/uploads')
    },
    filename: (req, file, cb) => {
        console.log("storage, file")
        cb(null, `${file.fieldname}-${req.body.username}`)
    }
})

const upload = multer({ storage: storage })

export const uploadFile = upload.single('avatar')
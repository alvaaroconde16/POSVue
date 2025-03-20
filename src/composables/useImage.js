import { ref, computed } from "vue"
import { useFirebaseStorage } from "vuefire"
import { ref as storageRef } from "firebase/database"

export default function useImage() {

    const url = ref('')
    const storage = useFirebaseStorage()

    const onFileChange = e => {
        const file = e.target.files[0]

        const filename = uid() + '.jpg'
        const sRef = storageRef(storage, '/products/' + filename)

        //Sube el archivo
        const uploadTask = uploadBytesResumable(sRef, file)

        uploadTask.on('state_changed', 
            () => {},
            (error) => console.log(error),
            () => {
                //Upload is complete
                //getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //    console.log(url.value = downloadURL)
                //})
            }
        )
    }

    const isImageUploaded = computed(() => {
        return url.value ? url.value : null
    })

    return {
        url,
        onFileChange,
        isImageUploaded
    }
}
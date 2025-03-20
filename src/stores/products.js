import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy } from "firebase/firestore";

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()

    const categories = [
        {id: 1, name: 'Sudaderas'},
        {id: 3, name: 'Tenis'},
        {id: 2, name: 'Lentes'},
    ]

    const q = query(collection(db, 'products'))
    const productsCollection = useCollection(q)


    const categoryOptions = computed(() => {
        const options = [
            {label: 'Seleccione', value: '', attrs: {disabled: true}},
            ...categories.map(category =>  (
                {label: category.name, value: category.id}
            ))
        ]
        return options
    })


    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    return {
        createProduct,
        categoryOptions,
    }
})
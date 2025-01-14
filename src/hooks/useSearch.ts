// imports
import { useState } from 'react'

// function
export const useSearch = (products: any[]) => {
    const [searchRef, setSearchRef] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSearch = () => {
        const productIndex = products.findIndex((product) => product.reference === searchRef)
        if (productIndex !== -1) {
            return productIndex
        } else {
            setError('Produto não encontrado!')
            return -1
        }
    };

    return { searchRef, setSearchRef, handleSearch, error }
}

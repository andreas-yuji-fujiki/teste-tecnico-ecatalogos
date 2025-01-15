import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Navigation, A11y } from 'swiper/modules'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import AppHeader from './AppHeader'
import ProductCard from './ProductCard'
import ProductInfoCard from '../molecules/ProductInfoCard'
import ThumbnailGallery from '../molecules/ThumbnailGalery'
import ProductInfoBtn from '../atoms/ProductInfoBtn'
import ProductSearchBtn from '../atoms/ProductSearchBtn'
import CartButton from '../atoms/CartButton'
import ProductInfo from '../molecules/ProductInfo'
import ItemValues from '../molecules/ItemValues'
import PackInfo from '../molecules/PackInfo'
import SearchCard from '../molecules/SearchCard'

import { Product, ProductData } from '../../types/types'

const ProductsSlider: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<ProductData | null>(null)
    const [searchRef, setSearchRef] = useState<string>('')

    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

    const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map())
    const swiperRef = useRef<SwiperType | null>(null)

    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
    const [sliderHeight, setSliderHeight] = useState<number>(0)

    const [isProductInfoCardVisible, setIsProductInfoCardVisible] = useState<boolean>(false)

    const [addedQuantities, setAddedQuantities] = useState<Map<number, number>>(new Map())
    const [cartTotal, setCartTotal] = useState<number>(0)

    // Alterando para armazenar as imagens dos produtos individualmente
    const [currentImages, setCurrentImages] = useState<Map<number, string>>(new Map())

    const toggleProductInfoCard = () => {
        setIsProductInfoCardVisible(prevState => !prevState)
    }

    const showSearchBox = () => setIsSearchVisible(true)
    const hideSearchBox = () => setIsSearchVisible(false)

    const handleSearch = () => {
        if (products && searchRef) {
            const productIndex = products.products.findIndex((product) => product.reference === searchRef)
            if (productIndex !== -1) {
                swiperRef.current?.slideTo(productIndex)
                hideSearchBox()
            } else {
                alert('Produto não encontrado!')
            }
        }
    }

    useEffect(() => {
        const updateHeight = () => {
            const headerHeight = 45
            setSliderHeight(window.innerHeight - headerHeight)
        }

        updateHeight()
        window.addEventListener('resize', updateHeight)

        return () => {
            window.removeEventListener('resize', updateHeight)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json')
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
                const data: ProductData = await response.json()
                setProducts(data)

                const counts = new Map<string, number>()
                data.products.forEach((product) => {
                    counts.set(product.category, (counts.get(product.category) || 0) + 1)
                })
                setCategoryCounts(counts)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido!')
            }
        }
        fetchData()
    }, [])

    const categories = products ? Array.from(new Set(products.products.map((product) => product.category))) : []

    const navigateToCategory = (direction: 'prev' | 'next') => {
        if (!products || !swiperRef.current) return

        const newIndex = direction === 'prev'
            ? (activeCategoryIndex - 1 + categories.length) % categories.length
            : (activeCategoryIndex + 1) % categories.length

        if (newIndex !== activeCategoryIndex) {
            const newCategory = categories[newIndex]
            const firstItemIndex = products.products.findIndex((product) => product.category === newCategory)


            if (firstItemIndex !== -1) {
                setActiveCategoryIndex(newIndex)
                swiperRef.current.slideTo(firstItemIndex)
            }
        }
    }

    const loopSwiper = (direction: 'prev' | 'next') => {
        if (!products || !swiperRef.current) return;
    
        const newIndex = direction === 'prev'
            ? (activeCategoryIndex - 1 + categories.length) % categories.length
            : (activeCategoryIndex + 1) % categories.length;
    
        // Verifica se a categoria foi alterada
        if (newIndex !== activeCategoryIndex) {
            const newCategory = categories[newIndex];
    
            // Encontre o índice do primeiro e último item da nova categoria
            const firstItemIndex = products.products.findIndex((product) => product.category === newCategory);
            const lastItemIndex = [...products.products].reverse().findIndex((product) => product.category === newCategory);
    
            if (firstItemIndex !== -1 && lastItemIndex !== -1) {
                setActiveCategoryIndex(newIndex);
    
                // Ajuste para navegar para o último item da categoria ao fazer "next"
                if (direction === 'next') {
                    swiperRef.current.slideTo(products.products.length - 1 - lastItemIndex);
                } else {
                    swiperRef.current.slideTo(firstItemIndex);
                }
            }
        }
    };
    
    const handleButtonClick = (direction: 'prev' | 'next') => {
        if (!swiperRef.current || !products) return;
    
        const totalSlides = products.products.length;
        const currentIndex = activeSlideIndex;
    
        // Verifica se está no último item da última categoria (botão próximo)
        if (direction === 'next' && currentIndex === totalSlides - 1) {
            // Se estiver, navega para o primeiro item da primeira categoria
            loopSwiper('next');
    
            // Encontrar o índice do primeiro item da primeira categoria
            const firstCategory = categories[0];
            const firstCategoryFirstIndex = products.products
                .find((product) => product.category === firstCategory);
    
            if (firstCategoryFirstIndex) {
                const firstIndex = products.products.indexOf(firstCategoryFirstIndex);
                swiperRef.current.slideTo(firstIndex);
            }
        }
        // Verifica se está no primeiro item da primeira categoria (botão anterior)
        else if (direction === 'prev' && currentIndex === 0) {
            // Se estiver, navega para o último item da última categoria
            loopSwiper('prev');
    
            // Encontrar o índice do último item da última categoria
            const lastCategory = categories[categories.length - 1];
            const lastCategoryLastIndex = products.products
                .filter((product) => product.category === lastCategory)
                .pop(); // Obtém o último item da última categoria
    
            if (lastCategoryLastIndex) {
                const lastIndex = products.products.indexOf(lastCategoryLastIndex);
                swiperRef.current.slideTo(lastIndex);
            }
        } else {
            // Avança ou retrocede um único slide
            if (direction === 'prev') {
                swiperRef.current.slideTo(currentIndex - 1 >= 0 ? currentIndex - 1 : totalSlides - 2);
            } else {
                swiperRef.current.slideTo(currentIndex + 1 < totalSlides ? currentIndex + 1 : 0);
            }
        }
    };

    const calculatePackValues = (product: Product) => {
        const GSizeQuantity = product.skus.find(sku => sku.size === 'G')?.min_quantity ?? 0
        const GGSizeQuantity = product.skus.find(sku => sku.size === 'GG')?.min_quantity ?? 0
        const MSizeQuantity = product.skus.find(sku => sku.size === 'M')?.min_quantity ?? 0
        const PSizeQuantity = product.skus.find(sku => sku.size === 'P')?.min_quantity ?? 0
    
        const PackQuantity = GSizeQuantity + GGSizeQuantity + MSizeQuantity + PSizeQuantity
        const PackValue = PackQuantity * product.price
    
        return { PackQuantity, PackValue }
    }

    const currentCategory = products ? products.products[activeSlideIndex]?.category : ''
    const currentCategoryCount = currentCategory ? categoryCounts.get(currentCategory) ?? 0 : 0
    const formattedCategoryDisplay = currentCategory ? `(${currentCategoryCount}) ${currentCategory}` : ''

    const currentProduct = products ? products.products[activeSlideIndex] : null

    const updateAddedQuantity = (productId: number, value: number) => {
        const product = products?.products.find((p) => p.id === productId)
        if (!product) return // Verifica se o produto existe
    
        // Calcula o PackValue
        const { PackValue } = calculatePackValues(product)
    
        // Usa o PackValue, se não for zero
        const valueToAdd = PackValue === 0 ? product.price : PackValue;  // Se PackValue for 0, usa o preço do produto, caso contrário usa o PackValue
        
        setAddedQuantities((prevQuantities) => {
            const updatedQuantities = new Map(prevQuantities)
            updatedQuantities.set(productId, value)
            return updatedQuantities
        })
    
        // Atualiza o valor total no carrinho com o valor correto
        updateCartTotal(productId, value)
    }    

    const updateCartTotal = (productId: number, quantity: number) => {
        let total = 0
        addedQuantities.forEach((quantityInCart, id) => {
            const product = products?.products.find((p) => p.id === id)
            if (product) {
                const { PackValue } = calculatePackValues(product)
                const valueToAdd = PackValue === 0 ? product.price : PackValue;
                total += quantityInCart * valueToAdd
            }
        })
        setCartTotal(total)
    }    

    useEffect(() => {
        updateCartTotal(0, 0)
    }, [addedQuantities, products])

    // Modificando a função handleImageClick
    const handleImageClick = (productId: number, imagePath: string) => {
        setCurrentImages((prevImages) => new Map(prevImages.set(productId, imagePath)))
    }

    // Duplicando os slides para simular o loop
    const duplicatedSlides = products ? [...products.products, ...products.products] : []

    return (
        <ProductsSliderWrapper>
            {error && <p>Error: {error}</p>}
            {products && (
                <AppHeader
                    onReturnClick={() => alert('Retornar')}
                    onConfigClick={() => alert('Configurações')}
                    onPrev={() => navigateToCategory('prev')}
                    onNext={() => navigateToCategory('next')}
                    currentCategory={formattedCategoryDisplay}
                    currentCategoryCount={currentCategoryCount}
                />
            )}

            <div className="swiper-button-prev" onClick={() => handleButtonClick('prev')}></div>
            <div className="swiper-button-next" onClick={() => handleButtonClick('next')}></div>
            <StyledSwiper
                onSwiper={(swiperInstance: SwiperType) => { swiperRef.current = swiperInstance }}
                onSlideChange={(swiper: SwiperType) => {
                    const totalSlides = products?.products.length ?? 0;

                    // Ajuste o índice para o loop de slides
                    const newActiveIndex = swiper.activeIndex % totalSlides;  // Garante que o índice esteja dentro do limite do número de produtos
                    setActiveSlideIndex(newActiveIndex); // Atualiza o índice do slide

                    // Se estivermos no primeiro slide e tentarmos ir para trás
                    if (newActiveIndex === 0 && swiper.previousIndex === totalSlides - 1) {
                        // Chama a função para ir para a última categoria
                        navigateToCategory('prev');
                    }

                    // Se estivermos no último slide e tentarmos ir para frente
                    if (newActiveIndex === totalSlides - 1 && swiper.previousIndex === 0) {
                        // Chama a função para ir para a primeira categoria
                        navigateToCategory('next');
                    }

                    // Ajusta a navegação de categoria baseado no slide atual
                    const currentCategory = products?.products[newActiveIndex]?.category;
                    if (currentCategory) {
                        const categoryIndex = categories.indexOf(currentCategory);
                        if (categoryIndex !== activeCategoryIndex) {
                            setActiveCategoryIndex(categoryIndex);
                        }
                    }
                }}
                spaceBetween={0}
                slidesPerView={1}
                speed={300}
                modules={[Navigation, A11y]}
                pagination={{ clickable: true }}
            >
                {products?.products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            product={product}
                            onInfoClick={toggleProductInfoCard}
                            onSearchClick={showSearchBox}
                            currentImage={currentImages.get(product.id) || product.images[0]?.path}
                        />
                    </SwiperSlide>
                ))}
            </StyledSwiper>

            {currentProduct && (
                <ProductDataWrapper>
                    <ProductButtonsWrapper>
                        <ProductInfoBtn onClick={toggleProductInfoCard} />
                        <ProductSearchBtn onClick={showSearchBox} />
                        <ThumbnailGallery
                            images={currentProduct.images}
                            currentImage={currentImages.get(currentProduct.id) || currentProduct.images[0]?.path} // Usando a imagem específica do produto
                            onImageClick={(imagePath) => handleImageClick(currentProduct.id, imagePath)} // Passando o id do produto
                        />
                        <CartButton />
                    </ProductButtonsWrapper>
                    <ProductInfo product={currentProduct} />
                    <ItemValues
                        addedQuantity={addedQuantities.get(currentProduct.id) || 0}
                        cartValue={cartTotal}
                        PackValue={calculatePackValues(currentProduct).PackValue === 0 ? currentProduct.price : calculatePackValues(currentProduct).PackValue}
                        onAdd={() => {
                            const currentQuantity = addedQuantities.get(currentProduct.id) || 0;
                            updateAddedQuantity(currentProduct.id, currentQuantity + 1);
                        }}
                        onRemove={() => {
                            const currentQuantity = addedQuantities.get(currentProduct.id) || 0;
                            if (currentQuantity > 0) updateAddedQuantity(currentProduct.id, currentQuantity - 1);
                        }}
                    />
                    {calculatePackValues(currentProduct).PackQuantity === 0 ? null : <PackInfo product={currentProduct} />}
                    {isProductInfoCardVisible && <ProductInfoCard product={currentProduct} onClose={toggleProductInfoCard} />}
                    {isSearchVisible && (
                        <SearchCard
                            searchRef={searchRef}
                            setSearchRef={setSearchRef}
                            onSearch={handleSearch}
                            onClose={hideSearchBox}
                        />
                    )}
                </ProductDataWrapper>
            )}
        </ProductsSliderWrapper>
    );
};

export default ProductsSlider

const ProductsSliderWrapper = styled.div`
    position: relative;
    height: 100dvh;
`

const StyledSwiper = styled(SwiperComponent)`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
`

const ProductDataWrapper = styled.div`
    position: absolute;
    z-index: 900;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`

const ProductButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding-top: 10px;
    border-top: 3px solid #809caa;
`

import React, { createContext, useContext, useState } from 'react';

interface CartContextProps {
    cartValue: number;
    setCartValue: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartValue, setCartValue] = useState<number>(0);

    return (
        <CartContext.Provider value={{ cartValue, setCartValue }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from "zustand/react/shallow";

export const useCart = (tenantSlug: string) => {
  const { addProduct, removeProduct, clearCart, clearAllCarts } =
    useCartStore();

  const productIds = useCartStore(
    useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || [])
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId);
      } else {
        addProduct(tenantSlug, productId);
      }
    },
    [addProduct, removeProduct, productIds, tenantSlug]
  );

  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const cleartTenantCart = useCallback(() => {
    clearCart(tenantSlug);
  }, [clearCart, tenantSlug]);

  const handleAddProduct = useCallback(
    (productId: string) => {
      addProduct(tenantSlug, productId);
    },
    [addProduct, tenantSlug]
  );

  const handleRemoveProduct = useCallback(
    (productId: string) => {
      removeProduct(tenantSlug, productId);
    },
    [removeProduct, tenantSlug]
  );

  return {
    productIds,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    clearCart: cleartTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};

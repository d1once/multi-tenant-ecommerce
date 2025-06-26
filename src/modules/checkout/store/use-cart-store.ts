import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TenantCart {
  productIds: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      tenantCarts: {},
      addProduct: (tenanutSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenanutSlug]: {
              productIds: [
                ...(state.tenantCarts[tenanutSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),
      removeProduct: (tenanutSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenanutSlug]: {
              productIds:
                state.tenantCarts[tenanutSlug]?.productIds.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        })),
      clearCart: (tenanutSlug) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenanutSlug]: {
              productIds: [],
            },
          },
        })),
      clearAllCarts: () =>
        set({
          tenantCarts: {},
        }),
    }),
    {
      name: "funroad-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { ProductItem, ProductListSkeleton } from "@/components/product-list/index.js";
import { store } from "@/store/store.js";

export function ProductListPage(elementId) {
  const container = document.getElementById(elementId); // products-grid
  let unsubscribe = null;

  function render(state) {
    const { products, isLoading } = state;
    if (!container) {
      return (document.innerHTML = "");
    }

    container.innerHTML = `${isLoading ? ProductListSkeleton() : products.map((product) => `${ProductItem(product)}`).join("")} `;
  }

  // function handleClick(e) {
  //   const target = e.target;
  //   const productId = target.dataset.id;

  //   if (target.classList.contains("view-detail")) {
  //     // 🔑 스토어 액션을 통해 라우팅
  //     actions.goToProductDetail(productId);
  //   }

  //   if (target.classList.contains("add-to-cart")) {
  //     const product = store.state.products.find((p) => p.id === productId);
  //     actions.addToCart(product);

  //     // 선택적: 장바구니 페이지로 이동
  //     // actions.goToCart();
  //   }
  // }

  function mount() {
    unsubscribe = store.subscribe((state) => {
      render(state);
    });

    // container.addEventListener("click", handleClick);
    render(store.state);
  }

  function unmount() {
    if (unsubscribe) unsubscribe();
    // container.removeEventListener("click", handleClick);
  }

  return { mount, unmount };
}

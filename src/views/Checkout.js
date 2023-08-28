// Hooks
import { useContext } from "react";

// Context
import { CartContext } from "../api/context/CartProvider";
import { ProductsContext } from "../api/context/ProductsProvider";

// Components
import CheckoutRow from "./CheckoutRow";

const Checkout = () => {
  // Context: cart info
  const { cartItems, cartTotalProducts, cartTotalPrice } =
    useContext(CartContext);
  console.log("cartItems", cartItems);

  // Context: all products
  const allProducts = useContext(ProductsContext);

  // Vars
  let cartProductsToPrint;
  let subtotal;

  // Actions
  // Find product by id
  const findProductById = (id) => {
    return allProducts.find((product) => product.id === id);
  };

  // New array with complete info + qty
  cartProductsToPrint = cartItems
    .map((item) => {
      const product = findProductById(item.productId);
      if (product) {
        return {
          ...product,
          qty: item.qty,
        };
      }
      return null; // Manejar el caso en que no se encuentre el producto
    })
    .filter((product) => product !== null);

  // Calculate the subtotal
  subtotal = cartProductsToPrint.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );

  return (
    <>
      {cartItems.length === 0 ? (
        <p>Your checkout is empty</p>
      ) : (
        // <div className="lg:px-20">
        <div className="xl:px-20">
          <h1 className="text-2xl font-bold w-full border-b border-slate-900">
            Checkout
          </h1>
          {/* Table */}
          <div className="cartSummary w-full mt-8 lg:mt-16 border border-slate-200 rounded">
            {/* Titles */}
            <div className="grid grid-cols-5 lg:gap-4 gap-y-8">
              <div className="col-span-2 font-bold p-1 lg:p-3 px-4">
                Product
              </div>
              <div className="font-bold p-1 lg:p-3 text-center">Price</div>
              <div className="font-bold p-1 lg:p-3 text-center">Quantity</div>
              <div className="font-bold p-1 lg:p-3 text-center">Total</div>
              <div className="col-span-5 border-t border-slate-200 mt-[-25px] lg:mt-[-15px]"></div>

              {/* Products rows */}
              {cartProductsToPrint.map((product, i) => {
                return (
                  <CheckoutRow
                    key={i}
                    imgSrc={product.image}
                    name={product.title}
                    price={product.price}
                    qty={product.qty}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-10 w-full flex ">
            <div className="hidden lg:block flex-grow"></div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold border-b border-slate-900">
                Total
              </h2>
              <div className="mt-4">
                <div className="flex items-center justify-start">
                  <p className="font-bold min-w-[100px] lg:min-w-[80px]">
                    Subtotal:
                  </p>
                  <p className="font-normal ml-6">{subtotal} €</p>
                </div>
                <div className="flex items-center justify-start">
                  <p className="font-bold min-w-[100px] lg:min-w-[80px]">Envío:</p>
                  <p className="font-normal ml-6">10 €</p>
                </div>
                <div className="flex items-center justify-start">
                  <p className="font-bold min-w-[100px] lg:min-w-[80px]">Total:</p>
                  <p className="font-normal ml-6">{subtotal + 10} €</p>
                </div>
              </div>
              <button className="bg-black text-white font-bold w-full uppercase px-5 py-2.5 mt-6">Finish order</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;

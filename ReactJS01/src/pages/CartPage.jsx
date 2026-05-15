import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart.context.jsx";
import QuantityButton from "../components/product/QuantityButton";

const CartPage = () => {
  const { cart, updateCartQty, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0,
  );

  if (!cart.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-3">Giỏ hàng</h1>
        <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống.</p>
        <Link
          to="/products"
          className="inline-block px-4 py-2 rounded bg-black text-white"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Giỏ hàng</h1>
        <button
          onClick={clearCart}
          className="text-sm px-3 py-2 border rounded"
        >
          Xóa toàn bộ
        </button>
      </div>

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border rounded-md p-3 flex items-center gap-3"
          >
            <img
              src={
                item.image || "https://via.placeholder.com/100x70?text=No+Image"
              }
              alt={item.name}
              className="w-24 h-16 object-cover rounded"
            />

            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">
                {Number(item.price || 0).toLocaleString()} đ
              </div>
            </div>

            <QuantityButton
              value={item.qty}
              setValue={(val) => updateCartQty(item.id, val)}
              min={1}
              max={9999}
            />

            <div className="w-36 text-right font-semibold">
              {(
                Number(item.price || 0) * Number(item.qty || 0)
              ).toLocaleString()}{" "}
              đ
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-3 py-2 border rounded text-red-600"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <div className="text-lg">Tổng tiền</div>
        <div className="text-2xl font-bold">{total.toLocaleString()} đ</div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-5 py-3 rounded bg-black text-white">
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;

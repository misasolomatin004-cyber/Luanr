import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useShop();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-xl font-serif text-zinc-900">Shopping Bag</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-zinc-300" />
                  </div>
                  <p className="text-zinc-500">Your bag is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-zinc-900 font-medium underline underline-offset-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-32 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-zinc-900">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-zinc-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-zinc-50 text-zinc-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-zinc-50 text-zinc-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-zinc-900">
                          {item.price * item.quantity} ₴
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-lg font-medium text-zinc-900">{cartTotal} ₴</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-zinc-900 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

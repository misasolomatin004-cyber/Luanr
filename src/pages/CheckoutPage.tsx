import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, CreditCard, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, cartTotal } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      alert('Order placed successfully!');
      navigate('/shop');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-zinc-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif text-zinc-900">Checkout</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span className={step >= 1 ? 'text-zinc-900 font-medium' : ''}>Shipping</span>
                <span>/</span>
                <span className={step >= 2 ? 'text-zinc-900 font-medium' : ''}>Payment</span>
                <span>/</span>
                <span className={step >= 3 ? 'text-zinc-900 font-medium' : ''}>Review</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-zinc-900 focus:ring-zinc-900"
                      />
                      <div className="ml-4 flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-zinc-500" />
                        <span className="font-medium text-zinc-900">Credit / Debit Card</span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-zinc-900 focus:ring-zinc-900"
                      />
                      <div className="ml-4 flex items-center gap-3">
                        <Truck className="w-5 h-5 text-zinc-500" />
                        <span className="font-medium text-zinc-900">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-50 p-6 rounded-xl space-y-4">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Shipping to</span>
                      <span className="text-zinc-900 font-medium text-right">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.zip}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Payment Method</span>
                      <span className="text-zinc-900 font-medium">
                        {formData.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 text-zinc-500 hover:text-zinc-900 font-medium transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20"
                >
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-serif text-zinc-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-zinc-900">{item.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium text-zinc-900 mt-1">{item.price * item.quantity} ₴</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-zinc-100 pt-6 space-y-2">
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Subtotal</span>
                <span>{cartTotal} ₴</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-zinc-900 pt-4">
                <span>Total</span>
                <span>{cartTotal} ₴</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

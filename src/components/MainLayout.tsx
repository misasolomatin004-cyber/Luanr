import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import CartDrawer from './CartDrawer';

export default function MainLayout() {
  const { cartCount, setIsCartOpen } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="p-2 -ml-2 mr-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-zinc-900" />
            </button>

            {/* Logo */}
            <Link to="/shop" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-serif font-light tracking-widest text-zinc-900">
                LUNA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/shop" className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors">
                New Arrivals
              </Link>
              <Link to="/shop" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                Clothing
              </Link>
              <Link to="/shop" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                Accessories
              </Link>
              <Link to="/shop" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                Sale
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-zinc-900 hover:text-zinc-700 transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-serif font-light tracking-widest text-zinc-900">
                  LUNA
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>
              <nav className="space-y-6 flex-1">
                <Link to="/shop" className="block text-lg font-medium text-zinc-900">
                  New Arrivals
                </Link>
                <Link to="/shop" className="block text-lg font-medium text-zinc-500">
                  Clothing
                </Link>
                <Link to="/shop" className="block text-lg font-medium text-zinc-500">
                  Accessories
                </Link>
                <Link to="/shop" className="block text-lg font-medium text-red-500">
                  Sale
                </Link>
              </nav>
              <div className="pt-6 border-t border-zinc-100">
                <button className="flex items-center space-x-3 text-zinc-500">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

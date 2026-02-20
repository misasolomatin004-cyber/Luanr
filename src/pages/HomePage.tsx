import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import BlackFridayBanner from '../components/BlackFridayBanner';

const CATEGORIES = ['All', 'Black Friday', 'Dresses', 'Jeans', 'Jackets', 'Skirts', 'Tops', 'Sportswear'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['Black', 'White', 'Pink', 'Beige', 'Blue'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Popular', value: 'popular' },
];

export default function HomePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([200, 5000]);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory === 'Black Friday' && !product.oldPrice) return false;
        if (selectedCategory !== 'All' && selectedCategory !== 'Black Friday' && product.category !== selectedCategory) return false;
        if (selectedSizes.length > 0 && !product.sizes.some((s) => selectedSizes.includes(s))) return false;
        if (selectedColors.length > 0 && !product.colors.some((c) => selectedColors.includes(c))) return false;
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'popular':
            return (b.rating || 0) - (a.rating || 0);
          default:
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        }
      });
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleShopNow = () => {
    setSelectedCategory('Black Friday');
    const productsSection = document.getElementById('products-grid');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      <BlackFridayBanner onShopNow={handleShopNow} />

      <div id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-lg text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-zinc-100 rounded-lg text-sm font-medium border-none focus:ring-0"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              isFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left text-sm transition-colors ${
                        selectedCategory === category
                          ? 'text-zinc-900 font-medium'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider mb-4">
                  Price
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                  />
                  <div className="flex justify-between mt-2 text-xs text-zinc-500">
                    <span>{priceRange[0]} ₴</span>
                    <span>{priceRange[1]} ₴</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider mb-4">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                        selectedSizes.includes(size)
                          ? 'bg-zinc-900 text-white shadow-md'
                          : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider mb-4">
                  Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center transition-all ${
                        selectedColors.includes(color) ? 'ring-2 ring-offset-2 ring-zinc-900' : ''
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      {selectedColors.includes(color) && (
                        <Check className={`w-4 h-4 ${color === 'White' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-8">
              <p className="text-sm text-zinc-500">
                Showing <span className="font-medium text-zinc-900">{filteredProducts.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium text-zinc-900 bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-zinc-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setPriceRange([200, 5000]);
                  }}
                  className="mt-4 text-zinc-900 font-medium underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const isFavorite = favorites.includes(product.id);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium tracking-wider uppercase text-zinc-900 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.oldPrice && (
            <span className="px-3 py-1 bg-red-500 text-xs font-medium tracking-wider uppercase text-white rounded-full shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-3 rounded-full shadow-lg transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-white text-zinc-900 rounded-full shadow-lg hover:bg-zinc-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-zinc-700">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-base font-medium text-zinc-900 mb-2 line-clamp-1 group-hover:text-pink-500 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-zinc-900">{product.price} ₴</span>
          {product.oldPrice && (
            <span className="text-sm text-zinc-400 line-through decoration-zinc-400/50">
              {product.oldPrice} ₴
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

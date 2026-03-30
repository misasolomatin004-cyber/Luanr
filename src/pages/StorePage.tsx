
import ErobloxLogo from '../components/ErobloxLogo';
import ErobloIcon from '../components/ErobloIcon';
import { useUser } from '../context/UserContext';
import { erobloPackages } from '../data/games';

interface StorePageProps {
  onBack: () => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
}

export default function StorePage({ onBack }: StorePageProps) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ErobloxLogo size="sm" />
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
            <ErobloIcon size={18} />
            <span className="text-white font-bold text-sm">{formatNumber(user.erobloBalance)}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <ErobloIcon size={48} />
            <h1 className="text-4xl font-black text-white">Eroblo Store</h1>
          </div>
          <p className="text-gray-400 text-lg">Get Eroblo to customize your avatar, unlock items, and more!</p>
        </div>

        {/* Eroblo Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {erobloPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-gray-900/60 backdrop-blur-sm rounded-2xl border p-6 hover:scale-105 transition-all duration-200 cursor-pointer group ${
                pkg.popular ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-gray-800 hover:border-violet-500/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                {/* Eroblo amount with icon */}
                <div className="relative mb-4">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                    pkg.popular ? 'bg-gradient-to-br from-amber-500/30 to-yellow-500/30' : 'bg-gradient-to-br from-gray-800 to-gray-900'
                  }`}>
                    <ErobloIcon size={40} />
                  </div>
                  {pkg.bonus > 0 && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      +{formatNumber(pkg.bonus)}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-black text-white mb-1">
                  {formatNumber(pkg.amount)}
                </h3>
                {pkg.bonus > 0 && (
                  <p className="text-green-400 text-xs font-medium mb-3">+{formatNumber(pkg.bonus)} bonus</p>
                )}
                {pkg.bonus === 0 && <div className="mb-3" />}

                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/20'
                    : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'
                }`}>
                  ${pkg.price.toFixed(2)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Upsell */}
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 rounded-2xl border border-amber-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Want More Eroblo?</h2>
          <p className="text-gray-400 mb-4">Eroblox Premium members get 10% bonus on all Eroblo purchases!</p>
          {user.isPremium ? (
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You have Premium - 10% bonus active!
            </div>
          ) : (
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg active:scale-95">
              Get Premium
            </button>
          )}
        </div>

        {/* Info section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/40 rounded-xl p-6 border border-gray-800 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-violet-500/20 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-1">Secure Payments</h3>
            <p className="text-gray-500 text-sm">All transactions are encrypted and secure via Stripe</p>
          </div>
          <div className="bg-gray-900/40 rounded-xl p-6 border border-gray-800 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-1">Instant Delivery</h3>
            <p className="text-gray-500 text-sm">Eroblo are added to your account immediately</p>
          </div>
          <div className="bg-gray-900/40 rounded-xl p-6 border border-gray-800 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <ErobloIcon size={24} />
            </div>
            <h3 className="text-white font-bold mb-1">Use Anywhere</h3>
            <p className="text-gray-500 text-sm">Spend Eroblo on avatar items, game passes, and more</p>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import ErobloxLogo from '../components/ErobloxLogo';
import ErobloIcon from '../components/ErobloIcon';
import Avatar from '../components/Avatar';
import { useUser } from '../context/UserContext';
import { featuredGames, gameColors } from '../data/games';
import { GamePlace } from '../types';

interface HomePageProps {
  onOpenStore: () => void;
  onLogout: () => void;
}

type NavTab = 'home' | 'games' | 'avatar' | 'inventory' | 'premium';

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function GameCard({ game, colorIdx }: { game: GamePlace; colorIdx: number }) {
  const color = gameColors[colorIdx % gameColors.length];
  return (
    <div className="group cursor-pointer">
      <div className={`relative bg-gradient-to-br ${color} rounded-xl overflow-hidden aspect-video mb-2 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center gap-1.5 text-xs text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {formatNumber(game.players)} playing
          </div>
        </div>
      </div>
      <h3 className="text-white font-semibold text-sm truncate">{game.title}</h3>
      <p className="text-gray-500 text-xs">{game.creator}</p>
    </div>
  );
}

export default function HomePage({ onOpenStore, onLogout }: HomePageProps) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return null;

  const filteredGames = searchQuery
    ? featuredGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : featuredGames;

  const navItems: { tab: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'home',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      tab: 'games',
      label: 'Discover',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      tab: 'avatar',
      label: 'Avatar',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      tab: 'inventory',
      label: 'Inventory',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      tab: 'premium',
      label: 'Premium',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 3l3.057-3L12 4.5 15.943 0 19 3l-3 6H8L5 3zM4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z" />
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Continue Playing */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Continue Playing</h2>
                <button className="text-violet-400 text-sm hover:text-violet-300">See All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredGames.slice(0, 6).map((game, i) => (
                  <GameCard key={game.id} game={game} colorIdx={i} />
                ))}
              </div>
            </section>

            {/* Popular */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Popular Right Now</h2>
                <button className="text-violet-400 text-sm hover:text-violet-300">See All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredGames.slice(6, 12).map((game, i) => (
                  <GameCard key={game.id} game={game} colorIdx={i + 6} />
                ))}
              </div>
            </section>

            {/* Recommended */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Recommended For You</h2>
                <button className="text-violet-400 text-sm hover:text-violet-300">See All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[...filteredGames].reverse().slice(0, 6).map((game, i) => (
                  <GameCard key={`rec-${game.id}`} game={game} colorIdx={i + 3} />
                ))}
              </div>
            </section>
          </div>
        );

      case 'games':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Discover Games</h2>
            {/* Genre filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['All', 'Adventure', 'RPG', 'Simulator', 'Tycoon', 'Horror', 'Strategy', 'Shooter', 'Obby'].map((genre) => (
                <button
                  key={genre}
                  className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium whitespace-nowrap hover:bg-violet-500/20 hover:text-violet-300 transition-all border border-gray-700 hover:border-violet-500/50"
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredGames.map((game, i) => (
                <GameCard key={game.id} game={game} colorIdx={i} />
              ))}
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold text-white">Your Avatar</h2>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700 p-12">
              <Avatar gender={user.gender} size="xl" showCircle={false} />
            </div>
            <div className="text-center">
              <p className="text-white text-lg font-semibold">{user.displayName}</p>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
              {['Hats', 'Shirts', 'Pants', 'Accessories', 'Hair', 'Face', 'Shoes', 'Gear'].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-300 text-sm font-medium hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-300 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-sm">More avatar customization coming soon!</p>
          </div>
        );

      case 'inventory':
        return (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Inventory</h2>
            <p className="text-gray-500">Your items and collectibles will appear here.</p>
            <button
              onClick={onOpenStore}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg active:scale-95"
            >
              <span className="flex items-center gap-2">
                <ErobloIcon size={20} />
                Get Eroblo
              </span>
            </button>
          </div>
        );

      case 'premium':
        return (
          <div className="max-w-2xl mx-auto text-center py-8">
            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-3xl border border-amber-500/30 p-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-900" fill="currentColor">
                  <path d="M5 3l3.057-3L12 4.5 15.943 0 19 3l-3 6H8L5 3zM4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Eroblox Premium</h2>
              <p className="text-gray-400 mb-6">Get exclusive perks, monthly Eroblo, and more!</p>

              {user.isPremium ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
                  <p className="text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You have Premium!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { name: 'Premium 450', eroblo: 450, price: '$4.99/mo' },
                    { name: 'Premium 1000', eroblo: 1000, price: '$9.99/mo' },
                    { name: 'Premium 2200', eroblo: 2200, price: '$19.99/mo' },
                  ].map((plan) => (
                    <button
                      key={plan.name}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-amber-500/50 transition-all group"
                    >
                      <div className="text-left">
                        <p className="text-white font-bold">{plan.name}</p>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <ErobloIcon size={14} /> {formatNumber(plan.eroblo)} Eroblo/month
                        </p>
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg text-sm group-hover:from-amber-600 group-hover:to-yellow-600 transition-all">
                        {plan.price}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                {[
                  'Monthly Eroblo Stipend',
                  'Access to Premium Items',
                  'Trade with Other Users',
                  '10% Bonus on Eroblo Purchases',
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-gray-900/90 border-r border-gray-800 flex flex-col transition-all duration-300 fixed left-0 top-0 bottom-0 z-20`}>
        {/* Logo */}
        <div className="p-3 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen ? (
            <ErobloxLogo size="sm" />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-black text-lg">E</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.tab
                  ? 'bg-violet-500/20 text-violet-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User section at bottom */}
        <div className="p-3 border-t border-gray-800">
          <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
            <Avatar gender={user.gender} size="sm" />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate flex items-center gap-1">
                  {user.displayName}
                  {user.isVerified && (
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </p>
                <p className="text-gray-500 text-xs truncate">@{user.username}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-56' : 'ml-16'} transition-all duration-300`}>
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences"
                  className="w-full bg-gray-900 border border-gray-800 rounded-full pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 ml-4">
              {/* Eroblo balance */}
              <button
                onClick={onOpenStore}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-full px-4 py-2 transition-all group"
              >
                <ErobloIcon size={18} />
                <span className="text-white font-bold text-sm">{formatNumber(user.erobloBalance)}</span>
                <span className="text-green-400 text-lg font-bold group-hover:scale-110 transition-transform">+</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-gray-950" />
              </button>

              {/* Settings / Logout */}
              <button
                onClick={onLogout}
                className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all"
                title="Logout"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

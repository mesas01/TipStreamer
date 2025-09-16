import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  Heart,
  Zap,
  Star,
  Gift,
  BarChart3,
  Headphones,
  Gamepad2,
  Menu,
  X,
  Shield,
  Coins,
  Cpu,
  Globe,
  Rocket,
  Trophy,
  Target,
  Wallet,
  Lock,
  Activity,
  Sparkles,
  Crown,
  Flame
} from 'lucide-react';

interface Tip {
  id: string;
  donor: string;
  amount: number;
  xlmAmount: number;
  message: string;
  timestamp: Date;
  txHash: string;
}

interface StreamerStats {
  totalTips: number;
  xlmEarned: number;
  tipCount: number;
  followers: number;
  avgTip: number;
  rank: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900/95 backdrop-blur-md fixed w-full z-50 border-b border-cyan-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl opacity-75 blur"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-xl">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                TipStreamer
              </span>
              <span className="text-xs text-gray-400 font-mono">Powered by Stellar</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Gaming</a>
            <a href="#blockchain" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Blockchain</a>
            <a href="#dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Dashboard</a>
            <a href="#leaderboard" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Leaderboard</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-full border border-cyan-500/20">
              <Coins className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300 font-mono">1 XLM = $0.12</span>
            </div>
            <button className="px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Connect Wallet
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold">
              Start Gaming
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
            <a href="#features" className="block text-gray-300 hover:text-cyan-400">Gaming</a>
            <a href="#blockchain" className="block text-gray-300 hover:text-cyan-400">Blockchain</a>
            <a href="#dashboard" className="block text-gray-300 hover:text-cyan-400">Dashboard</a>
            <a href="#leaderboard" className="block text-gray-300 hover:text-cyan-400">Leaderboard</a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
              <button className="text-left text-gray-300">Connect Wallet</button>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                Start Gaming
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  const [currentXLM, setCurrentXLM] = useState(0.1234);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentXLM(prev => prev + (Math.random() - 0.5) * 0.001);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Gaming Icons Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-20 animate-spin-slow"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-full shadow-2xl border border-cyan-500/30">
                <div className="flex items-center space-x-6">
                  <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 p-4 rounded-full animate-bounce">
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-full animate-bounce delay-200">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 rounded-full animate-bounce delay-400">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-300 text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Powered by Stellar Blockchain</span>
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Level Up Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Gaming
            </span>
            <br />
            <span className="text-4xl md:text-5xl">with Crypto Tips</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            The first decentralized gaming tip platform on Stellar Network. 
            Instant XLM transactions, zero fees, and epic rewards for streamers and viewers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25">
              <span className="flex items-center space-x-2">
                <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                <span>Launch Stream</span>
              </span>
            </button>
            <button className="bg-gray-800/50 backdrop-blur-sm text-gray-300 px-8 py-4 rounded-full text-lg font-semibold border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all">
              <span className="flex items-center space-x-2">
                <Wallet className="w-5 h-5" />
                <span>Connect Stellar Wallet</span>
              </span>
            </button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white">15K+</div>
              <div className="text-sm text-gray-400">Pro Gamers</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all">
              <div className="flex items-center justify-center mb-2">
                <Coins className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white">2.5M</div>
              <div className="text-sm text-gray-400">XLM Tipped</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-pink-500/20 hover:border-pink-400/40 transition-all">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-8 h-8 text-pink-400" />
              </div>
              <div className="text-3xl font-bold text-white">0.001s</div>
              <div className="text-sm text-gray-400">Avg Transaction</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all">
              <div className="flex items-center justify-center mb-2">
                <Activity className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white font-mono">${currentXLM.toFixed(4)}</div>
              <div className="text-sm text-gray-400">XLM Price</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Tips",
      description: "Instant XLM transactions on Stellar Network. Tips arrive in under 5 seconds with near-zero fees.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Security",
      description: "Decentralized and secure. All transactions are recorded on Stellar's immutable ledger.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamer Rewards",
      description: "Earn XP, unlock achievements, and climb leaderboards. Gaming meets DeFi rewards.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Smart Contracts",
      description: "Automated tip distribution, goal tracking, and reward systems powered by Stellar smart contracts.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "VIP Gaming Tiers",
      description: "Unlock exclusive perks, custom badges, and premium features as you level up your gaming profile.",
      gradient: "from-amber-400 to-yellow-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Gaming Hub",
      description: "Connect with gamers worldwide. Multi-language support and cross-platform integration.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30">
              <span className="text-cyan-300 font-semibold">🎮 Gaming Features</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Next-Gen Gaming{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Meets Blockchain
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionary features designed for the modern gaming ecosystem, powered by Stellar's lightning-fast blockchain
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl text-white mb-6 w-fit group-hover:scale-110 transition-transform shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stellar Network Info */}
        <div className="mt-16 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/20">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-full">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Built on Stellar Network</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience the power of Stellar's decentralized network with 3-5 second transaction times, 
              minimal fees (0.00001 XLM), and enterprise-grade security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">3-5s</div>
                <div className="text-sm text-gray-400">Transaction Speed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">$0.000001</div>
                <div className="text-sm text-gray-400">Average Fee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">99.99%</div>
                <div className="text-sm text-gray-400">Network Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const recentTips: Tip[] = [
    { 
      id: '1', 
      donor: 'CryptoGamer_XLM', 
      amount: 25, 
      xlmAmount: 208.33,
      message: 'Epic headshot! 🎯 Keep dominating! 🔥', 
      timestamp: new Date(Date.now() - 300000),
      txHash: 'a1b2c3d4e5f6...'
    },
    { 
      id: '2', 
      donor: 'StellarWarrior', 
      amount: 10, 
      xlmAmount: 83.33,
      message: 'Insane gameplay! You\'re a legend! 👑', 
      timestamp: new Date(Date.now() - 900000),
      txHash: 'f6e5d4c3b2a1...'
    },
    { 
      id: '3', 
      donor: 'BlockchainBeast', 
      amount: 50, 
      xlmAmount: 416.67,
      message: 'That clutch was INSANE! 🚀💎', 
      timestamp: new Date(Date.now() - 1800000),
      txHash: '123abc456def...'
    },
    { 
      id: '4', 
      donor: 'XLM_Hodler', 
      amount: 15, 
      xlmAmount: 125,
      message: 'To the moon! 🌙 Great stream bro!', 
      timestamp: new Date(Date.now() - 3600000),
      txHash: 'def456abc123...'
    }
  ];

  const stats: StreamerStats = {
    totalTips: 2847,
    xlmEarned: 23725,
    tipCount: 156,
    followers: 18943,
    avgTip: 18.25,
    rank: 'Diamond'
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getRankColor = (rank: string) => {
    switch(rank) {
      case 'Diamond': return 'from-cyan-400 to-blue-500';
      case 'Gold': return 'from-yellow-400 to-orange-500';
      case 'Silver': return 'from-gray-300 to-gray-500';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-cyan-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30">
              <span className="text-cyan-300 font-semibold">⚡ Gaming Dashboard</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Your Gaming{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Command Center
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Track your XLM earnings, gaming stats, and blockchain transactions
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Gaming Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-400">+15%</span>
              </div>
              <div className="text-2xl font-bold text-white">${stats.totalTips}</div>
              <div className="text-sm text-gray-400">Total Earnings</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-cyan-400">+22%</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">{stats.xlmEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-400">XLM Earned</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-400">+8%</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Gaming Squad</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-orange-400">+12%</span>
              </div>
              <div className="text-2xl font-bold text-white">${stats.avgTip}</div>
              <div className="text-sm text-gray-400">Avg. Tip</div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-400/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${getRankColor(stats.rank)} p-3 rounded-xl`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.rank}</div>
              <div className="text-sm text-gray-400">Gaming Rank</div>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Tips with Blockchain Info */}
            <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span>Live Gaming Tips</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">Live on Stellar</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/30 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {tip.donor[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{tip.donor}</span>
                          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 px-2 py-1 rounded-full text-xs text-white font-medium">
                            GAMER
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">${tip.amount}</div>
                          <div className="text-xs text-cyan-400 font-mono">{tip.xlmAmount} XLM</div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{tip.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{formatTime(tip.timestamp)}</span>
                        <div className="flex items-center space-x-2">
                          <Lock className="w-3 h-3 text-cyan-400" />
                          <span className="text-xs text-cyan-400 font-mono">{tip.txHash}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaming Actions & Goals */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span>Gaming Actions</span>
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all font-semibold">
                    🎮 Go Live
                  </button>
                  <button className="w-full bg-gray-700/50 text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-600/50 transition-colors">
                    ⚙️ Stream Settings
                  </button>
                  <button className="w-full bg-gray-700/50 text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-600/50 transition-colors">
                    📊 XLM Analytics
                  </button>
                  <button className="w-full bg-gray-700/50 text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-600/50 transition-colors">
                    🏆 Leaderboard
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 text-white">
                <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Monthly XLM Goal</span>
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>18,450 / 25,000 XLM</span>
                    <span>73.8%</span>
                  </div>
                  <div className="bg-gray-700/50 rounded-full h-4">
                    <div className="bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full h-4 w-[73.8%] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm opacity-90">🚀 Almost there! 6,550 XLM to go!</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4">🔗 Stellar Network Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-green-400 font-medium">✅ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Block:</span>
                    <span className="text-cyan-400 font-mono">#47,892,156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">XLM Price:</span>
                    <span className="text-white font-medium">$0.1234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />
      <Features />
      <Dashboard />
    </div>
  );
};

export default App;
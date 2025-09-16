import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Star,
  Medal,
  TrendingUp,
  Users,
  Coins,
  Flame,
  Zap,
  Target,
  Award,
  Gamepad2
} from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  streamer: string;
  platform: string;
  totalEarned: number;
  xlmEarned: number;
  followers: number;
  avgTip: number;
  tier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  isVerified: boolean;
  avatar: string;
}

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'earnings' | 'tips' | 'followers'>('earnings');

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      streamer: 'CryptoGamer_XLM',
      platform: 'twitch',
      totalEarned: 15420,
      xlmEarned: 128500,
      followers: 45200,
      avgTip: 34.2,
      tier: 'Diamond',
      isVerified: true,
      avatar: 'C'
    },
    {
      rank: 2,
      streamer: 'StellarWarrior',
      platform: 'youtube',
      totalEarned: 12850,
      xlmEarned: 107083,
      followers: 38900,
      avgTip: 28.7,
      tier: 'Diamond',
      isVerified: true,
      avatar: 'S'
    },
    {
      rank: 3,
      streamer: 'BlockchainBeast',
      platform: 'twitch',
      totalEarned: 9750,
      xlmEarned: 81250,
      followers: 29400,
      avgTip: 22.1,
      tier: 'Gold',
      isVerified: true,
      avatar: 'B'
    },
    {
      rank: 4,
      streamer: 'XLM_Hodler',
      platform: 'facebook',
      totalEarned: 8200,
      xlmEarned: 68333,
      followers: 24800,
      avgTip: 19.5,
      tier: 'Gold',
      isVerified: false,
      avatar: 'X'
    },
    {
      rank: 5,
      streamer: 'GamingGalaxy',
      platform: 'tiktok',
      totalEarned: 6900,
      xlmEarned: 57500,
      followers: 52100,
      avgTip: 15.8,
      tier: 'Silver',
      isVerified: true,
      avatar: 'G'
    },
    {
      rank: 6,
      streamer: 'PixelPioneer',
      platform: 'youtube',
      totalEarned: 5400,
      xlmEarned: 45000,
      followers: 18700,
      avgTip: 12.3,
      tier: 'Silver',
      isVerified: false,
      avatar: 'P'
    },
    {
      rank: 7,
      streamer: 'RetroRacer',
      platform: 'twitch',
      totalEarned: 4200,
      xlmEarned: 35000,
      followers: 15200,
      avgTip: 9.8,
      tier: 'Bronze',
      isVerified: true,
      avatar: 'R'
    },
    {
      rank: 8,
      streamer: 'NeonNinja',
      platform: 'other',
      totalEarned: 3800,
      xlmEarned: 31667,
      followers: 12900,
      avgTip: 8.4,
      tier: 'Bronze',
      isVerified: false,
      avatar: 'N'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond':
        return 'from-cyan-400 to-blue-500';
      case 'Gold':
        return 'from-yellow-400 to-orange-500';
      case 'Silver':
        return 'from-gray-300 to-gray-500';
      case 'Bronze':
        return 'from-amber-600 to-amber-800';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitch':
        return '🎮';
      case 'youtube':
        return '📺';
      case 'facebook':
        return '📘';
      case 'tiktok':
        return '🎵';
      default:
        return '🎯';
    }
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (activeTab) {
      case 'earnings':
        return b.totalEarned - a.totalEarned;
      case 'tips':
        return b.avgTip - a.avgTip;
      case 'followers':
        return b.followers - a.followers;
      default:
        return a.rank - b.rank;
    }
  });

  return (
    <section id="leaderboard" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-cyan-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-500/30">
              <span className="text-yellow-300 font-semibold">🏆 Gaming Leaderboard</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Top Gaming{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Streamers
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Compete with the best streamers on Stellar Network
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'earnings'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Coins className="w-4 h-4" />
                    <span>Earnings</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('tips')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'tips'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Avg Tips</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('followers')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'followers'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Followers</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {sortedData.slice(0, 3).map((entry, index) => (
              <div
                key={entry.streamer}
                className={`relative ${
                  index === 0 ? 'md:order-2 transform md:scale-110' : 
                  index === 1 ? 'md:order-1' : 'md:order-3'
                }`}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 text-center hover:border-cyan-500/30 transition-all group">
                  {/* Rank Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`bg-gradient-to-r ${
                      index === 0 ? 'from-yellow-400 to-orange-500' :
                      index === 1 ? 'from-gray-300 to-gray-500' :
                      'from-amber-600 to-amber-800'
                    } p-3 rounded-full shadow-lg`}>
                      {getRankIcon(entry.rank)}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="mt-6 mb-4">
                    <div className={`bg-gradient-to-r ${getTierColor(entry.tier)} w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      {entry.avatar}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="text-lg font-bold text-white">{entry.streamer}</h3>
                      {entry.isVerified && (
                        <Star className="w-4 h-4 text-blue-400 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mt-1">
                      <span className="text-2xl">{getPlatformIcon(entry.platform)}</span>
                      <span className="text-sm text-gray-400 capitalize">{entry.platform}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="bg-gray-700/30 rounded-xl p-3">
                      <div className="text-2xl font-bold text-green-400">
                        ${entry.totalEarned.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">Total Earned</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-700/20 rounded-lg p-2">
                        <div className="font-bold text-cyan-400">{entry.xlmEarned.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">XLM</div>
                      </div>
                      <div className="bg-gray-700/20 rounded-lg p-2">
                        <div className="font-bold text-purple-400">{entry.followers.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Followers</div>
                      </div>
                    </div>
                  </div>

                  {/* Tier Badge */}
                  <div className="mt-4">
                    <div className={`bg-gradient-to-r ${getTierColor(entry.tier)} px-3 py-1 rounded-full text-white text-xs font-bold inline-block`}>
                      {entry.tier}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Leaderboard */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Full Leaderboard</span>
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-semibold">Rank</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Streamer</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Platform</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Earnings</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">XLM</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Followers</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Avg Tip</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((entry, index) => (
                    <tr
                      key={entry.streamer}
                      className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {entry.rank <= 3 ? (
                            getRankIcon(entry.rank)
                          ) : (
                            <span className="text-gray-400 font-bold">#{entry.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`bg-gradient-to-r ${getTierColor(entry.tier)} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                            {entry.avatar}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{entry.streamer}</span>
                              {entry.isVerified && (
                                <Star className="w-4 h-4 text-blue-400 fill-current" />
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{getPlatformIcon(entry.platform)}</span>
                          <span className="text-gray-300 capitalize">{entry.platform}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-green-400 font-bold">${entry.totalEarned.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-cyan-400 font-mono">{entry.xlmEarned.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-purple-400">{entry.followers.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-orange-400">${entry.avgTip}</span>
                      </td>
                      <td className="p-4">
                        <div className={`bg-gradient-to-r ${getTierColor(entry.tier)} px-2 py-1 rounded-full text-white text-xs font-bold inline-block`}>
                          {entry.tier}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gaming Stats */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6 text-center">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">2,847</div>
              <div className="text-cyan-300 font-medium">Active Streamers</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 text-center">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">156K</div>
              <div className="text-purple-300 font-medium">Tips Sent Today</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6 text-center">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$2.5M</div>
              <div className="text-green-300 font-medium">Total Volume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
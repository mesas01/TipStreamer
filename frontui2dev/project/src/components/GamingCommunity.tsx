import React, { useState } from 'react';
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Gamepad2,
  Headphones,
  Mic,
  Video,
  Gift,
  Trophy,
  Zap,
  Crown,
  Target,
  Coffee
} from 'lucide-react';

const GamingCommunity: React.FC = () => {
  const [message, setMessage] = useState('');

  const communityStats = [
    { icon: Users, label: 'Active Gamers', value: '15,247', color: 'from-blue-500 to-cyan-500' },
    { icon: Gamepad2, label: 'Live Streams', value: '1,834', color: 'from-purple-500 to-pink-500' },
    { icon: Heart, label: 'Tips Sent', value: '89.2K', color: 'from-red-500 to-pink-500' },
    { icon: Trophy, label: 'Tournaments', value: '156', color: 'from-yellow-500 to-orange-500' }
  ];

  const chatMessages = [
    { user: 'CryptoKitty_XLM', message: '🎮 Just hit a new high score! Thanks for the tips!', time: '2m ago', tips: 25 },
    { user: 'GamerCat_Pro', message: 'Epic stream today! 🔥 The community is amazing!', time: '5m ago', tips: 18 },
    { user: 'PixelPaws', message: 'Who else is excited for the tournament? 🏆', time: '8m ago', tips: 12 },
    { user: 'NeonWhiskers', message: 'Thanks for the XLM support! 💎 You guys rock!', time: '12m ago', tips: 31 }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-orange-900/10 to-blue-900/10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-500/30">
              <span className="text-orange-300 font-semibold">🐱 Gaming Community</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Join the{' '}
            <span className="bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">
              Purr-fect
            </span>
            <br />
            Gaming Community
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with fellow gamers, share epic moments, and support each other with XLM tips in our friendly community
          </p>
        </div>

        {/* Gaming Cats Hero Image */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-blue-500 to-purple-500 rounded-3xl opacity-20 animate-pulse blur-xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <div className="flex items-center justify-center space-x-8">
                {/* Left Gaming Cat */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-75 blur animate-pulse group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <div className="text-6xl">🐱</div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-full shadow-lg animate-bounce">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* VS Symbol */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-full shadow-2xl animate-pulse">
                  <Zap className="w-8 h-8 text-white" />
                </div>

                {/* Right Gaming Cat */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-75 blur animate-pulse group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <div className="text-6xl">🐱</div>
                  </div>
                  <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-full shadow-lg">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-600 p-2 rounded-full shadow-lg animate-bounce delay-300">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Gaming Elements */}
              <div className="flex justify-center mt-8 space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg animate-bounce">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg animate-bounce delay-200">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg animate-bounce delay-400">
                  <Gift className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 text-center hover:border-cyan-500/30 transition-all group"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Chat */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                <span>Community Chat</span>
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">Live</span>
              </div>
            </div>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    🐱
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{msg.user}</span>
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-2 py-0.5 rounded-full text-xs text-white font-medium">
                          ${msg.tips}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Community Actions */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>Community Actions</span>
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all font-semibold flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Join Gaming Squad</span>
                </button>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all font-semibold flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Enter Tournament</span>
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold flex items-center justify-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Send Community Tip</span>
                </button>
                <button className="w-full bg-gray-700/50 text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-600/50 transition-colors flex items-center justify-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>View Challenges</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-6 text-white">
              <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-orange-400" />
                <span>Daily Gaming Goal</span>
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Stream for 4 hours</span>
                  <span>75%</span>
                </div>
                <div className="bg-gray-700/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-orange-400 to-blue-500 rounded-full h-3 w-[75%] transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-90">🎮 Keep going! 1 hour left to complete your daily goal!</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🌟 Featured Streamers</h3>
              <div className="space-y-3">
                {['CryptoKitty_XLM', 'GamerCat_Pro', 'PixelPaws'].map((streamer, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-xl p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-orange-500 to-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">
                        🐱
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{streamer}</div>
                        <div className="text-xs text-gray-400">Live now</div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:from-cyan-600 hover:to-blue-700 transition-all">
                      Watch
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingCommunity;
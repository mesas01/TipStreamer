import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  User,
  Shield,
  DollarSign,
  Coins,
  ArrowRight,
  ArrowLeft,
  Settings,
  Star,
  Gamepad2,
  Trash2,
  Plus
} from 'lucide-react';
import { TwitchIcon, YoutubeIcon, FacebookIcon, TiktokIcon } from './PlatformIcons';
import { useStreamerConfig } from '../hooks/useStreamerConfig';
import { StreamerConfig } from '../types/streamer';

interface StreamerSetupProps {
  onComplete: (config: StreamerConfig) => void;
  onSkip?: () => void;
}

const StreamerSetup: React.FC<StreamerSetupProps> = ({ onComplete, onSkip }) => {
  const {
    currentStep,
    streamerConfig,
    errors,
    isLoading,
    checkExistingConfiguration,
    confirmStreamerIdentity,
    saveConfiguration,
    updateConfig,
    nextStep,
    previousStep,
    clearErrors
  } = useStreamerConfig();

  const [newAsset, setNewAsset] = useState('');

  useEffect(() => {
    // Verificar configuración existente al montar el componente
    const checkConfig = async () => {
      const existingConfig = await checkExistingConfiguration();
      if (existingConfig) {
        // Si ya está configurado, mostrar error
        updateConfig({ isConfigured: true });
      }
    };
    
    checkConfig();
  }, []);

  // Si ya está configurado, mostrar error
  if (streamerConfig.isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 flex items-center justify-center p-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8 max-w-md w-full text-center">
          <div className="bg-red-500/20 p-4 rounded-full w-fit mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Error: Ya inicializado</h2>
          <p className="text-gray-300 mb-6">
            Tu cuenta de streamer ya está configurada. No puedes ejecutar la configuración inicial nuevamente.
          </p>
          <button
            onClick={onSkip}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors"
          >
            Continuar al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Verificación', description: 'Confirmar identidad' },
    { number: 2, title: 'Configuración', description: 'Fee y plataforma' },
    { number: 3, title: 'Activos', description: 'Activos permitidos' },
    { number: 4, title: 'Finalizar', description: 'Guardar configuración' }
  ];

  const platforms = [
    { id: 'twitch', name: 'Twitch', icon: TwitchIcon, color: 'from-purple-500 to-purple-600' },
    { id: 'youtube', name: 'YouTube', icon: YoutubeIcon, color: 'from-red-500 to-red-600' },
    { id: 'facebook', name: 'Facebook Gaming', icon: FacebookIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'tiktok', name: 'TikTok', icon: TiktokIcon, color: 'from-pink-500 to-pink-600' },
    { id: 'other', name: 'Otra Plataforma', icon: Gamepad2, color: 'from-gray-500 to-gray-600' }
  ];

  const handleIdentityConfirmation = async () => {
    if (!streamerConfig.name || !streamerConfig.platform) {
      updateConfig({ isIdentityConfirmed: false });
      return;
    }

    const confirmed = await confirmStreamerIdentity(streamerConfig.platform, streamerConfig.name);
    if (confirmed) {
      nextStep();
    }
  };

  const handleAddAsset = () => {
    if (newAsset.trim() && !streamerConfig.allowedAssets?.includes(newAsset.toUpperCase())) {
      const currentAssets = streamerConfig.allowedAssets || [];
      updateConfig({
        allowedAssets: [...currentAssets, newAsset.toUpperCase()]
      });
      setNewAsset('');
    }
  };

  const handleRemoveAsset = (asset: string) => {
    const currentAssets = streamerConfig.allowedAssets || [];
    updateConfig({
      allowedAssets: currentAssets.filter(a => a !== asset)
    });
  };

  const handleFinalSave = async () => {
    const config: StreamerConfig = {
      name: streamerConfig.name || '',
      platform: streamerConfig.platform || 'other',
      isConfigured: false,
      isIdentityConfirmed: streamerConfig.isIdentityConfirmed || false,
      feePercentage: streamerConfig.feePercentage || 0,
      allowedAssets: streamerConfig.allowedAssets || ['XLM'],
      stellarPublicKey: streamerConfig.stellarPublicKey
    };

    const success = await saveConfiguration(config);
    if (success) {
      onComplete(config);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Confirmar Identidad</h2>
              <p className="text-gray-300">Verifica tu identidad como streamer</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de Usuario/Canal
                </label>
                <input
                  type="text"
                  value={streamerConfig.name || ''}
                  onChange={(e) => updateConfig({ name: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="Tu nombre de streamer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plataforma de Streaming
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => updateConfig({ platform: platform.id as any })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        streamerConfig.platform === platform.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                      }`}
                    >
                      <div className={`bg-gradient-to-r ${platform.color} p-2 rounded-lg w-fit mx-auto mb-2`}>
                        <platform.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-white font-medium">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleIdentityConfirmation}
              disabled={!streamerConfig.name || !streamerConfig.platform || isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Confirmar Identidad</span>
                </>
              )}
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Configuración de Fee</h2>
              <p className="text-gray-300">Establece tu porcentaje de comisión (0-100%)</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fee Percentage (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={streamerConfig.feePercentage || 0}
                    onChange={(e) => updateConfig({ feePercentage: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="0.0"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">%</div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Porcentaje que se descontará de cada tip recibido
                </p>
              </div>

              {errors.find(e => e.field === 'feePercentage') && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">
                    {errors.find(e => e.field === 'feePercentage')?.message}
                  </span>
                </div>
              )}

              <div className="bg-gray-700/30 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2">Vista Previa</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tip recibido:</span>
                    <span className="text-white">100 XLM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee ({streamerConfig.feePercentage || 0}%):</span>
                    <span className="text-red-400">-{((streamerConfig.feePercentage || 0) * 100 / 100).toFixed(2)} XLM</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 flex justify-between font-medium">
                    <span className="text-gray-300">Recibes:</span>
                    <span className="text-green-400">{(100 - (streamerConfig.feePercentage || 0)).toFixed(2)} XLM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={previousStep}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                <Coins className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Activos Permitidos</h2>
              <p className="text-gray-300">Configura qué activos pueden usar para enviarte tips</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Agregar Activo
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAsset}
                    onChange={(e) => setNewAsset(e.target.value.toUpperCase())}
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    placeholder="Ej: XLM, USDC, BTC"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAsset()}
                  />
                  <button
                    onClick={handleAddAsset}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-xl transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Activos Configurados
                </label>
                {streamerConfig.allowedAssets && streamerConfig.allowedAssets.length > 0 ? (
                  <div className="space-y-2">
                    {streamerConfig.allowedAssets.map((asset, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-700/30 rounded-xl p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg">
                            <Coins className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-medium">{asset}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveAsset(asset)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                    <Coins className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">No hay activos configurados</p>
                    <p className="text-xs text-gray-500 mt-1">Agrega al menos un activo para continuar</p>
                  </div>
                )}
              </div>

              {errors.find(e => e.field === 'allowedAssets') && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">
                    {errors.find(e => e.field === 'allowedAssets')?.message}
                  </span>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={previousStep}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>
              <button
                onClick={nextStep}
                disabled={!streamerConfig.allowedAssets || streamerConfig.allowedAssets.length === 0}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Finalizar Configuración</h2>
              <p className="text-gray-300">Revisa y guarda tu configuración</p>
            </div>

            <div className="bg-gray-700/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Streamer:</span>
                <span className="text-white font-medium">{streamerConfig.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Plataforma:</span>
                <span className="text-white font-medium capitalize">{streamerConfig.platform}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Fee (%):</span>
                <span className="text-white font-medium">{streamerConfig.feePercentage}%</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-gray-400">Activos:</span>
                <div className="text-right">
                  {streamerConfig.allowedAssets?.map((asset, index) => (
                    <div key={index} className="text-white font-medium">{asset}</div>
                  ))}
                </div>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="space-y-2">
                {errors.map((error, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 text-sm">{error.message}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={previousStep}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>
              <button
                onClick={handleFinalSave}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Settings className="w-5 h-5" />
                    <span>Guardar Configuración</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 flex items-center justify-center p-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-500 text-white'
                  : 'border-gray-600 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{step.number}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.number ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default StreamerSetup;
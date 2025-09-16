import { useState, useEffect } from 'react';
import { StreamerConfig, ConfigurationState, ValidationError } from '../types/streamer';

export const useStreamerConfig = () => {
  const [state, setState] = useState<ConfigurationState>({
    currentStep: 1,
    streamerConfig: {},
    errors: [],
    isLoading: false
  });

  // Simular verificación de configuración existente
  const checkExistingConfiguration = async (): Promise<StreamerConfig | null> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar localStorage para configuración existente
      const savedConfig = localStorage.getItem('streamerConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig) as StreamerConfig;
        if (config.isConfigured) {
          return config;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error checking configuration:', error);
      return null;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Validar fee percentage
  const validateFeePercentage = (fee: number): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (fee < 0 || fee > 100) {
      errors.push({
        field: 'feePercentage',
        message: 'El fee debe estar entre 0% y 100%'
      });
    }
    
    return errors;
  };

  // Validar lista de activos
  const validateAllowedAssets = (assets: string[]): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (assets.length === 0) {
      errors.push({
        field: 'allowedAssets',
        message: 'Debe permitir al menos un activo'
      });
    }
    
    return errors;
  };

  // Remover duplicados de activos
  const removeDuplicateAssets = (assets: string[]): string[] => {
    return [...new Set(assets.map(asset => asset.toUpperCase()))];
  };

  // Confirmar identidad del streamer
  const confirmStreamerIdentity = async (platform: string, username: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simular verificación de identidad
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular verificación exitosa (en producción sería una llamada real a la API)
      const isValid = username.length > 3 && platform !== '';
      
      if (isValid) {
        setState(prev => ({
          ...prev,
          streamerConfig: {
            ...prev.streamerConfig,
            isIdentityConfirmed: true
          }
        }));
      }
      
      return isValid;
    } catch (error) {
      console.error('Error confirming identity:', error);
      return false;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Guardar configuración
  const saveConfiguration = async (config: StreamerConfig): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Validaciones finales
      const feeErrors = validateFeePercentage(config.feePercentage);
      const assetErrors = validateAllowedAssets(config.allowedAssets);
      const allErrors = [...feeErrors, ...assetErrors];
      
      if (allErrors.length > 0) {
        setState(prev => ({ ...prev, errors: allErrors }));
        return false;
      }

      // Limpiar duplicados
      const cleanedAssets = removeDuplicateAssets(config.allowedAssets);
      
      const finalConfig: StreamerConfig = {
        ...config,
        allowedAssets: cleanedAssets,
        isConfigured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Simular guardado en API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Guardar en localStorage
      localStorage.setItem('streamerConfig', JSON.stringify(finalConfig));
      
      setState(prev => ({
        ...prev,
        streamerConfig: finalConfig,
        errors: []
      }));
      
      return true;
    } catch (error) {
      console.error('Error saving configuration:', error);
      setState(prev => ({
        ...prev,
        errors: [{ field: 'general', message: 'Error al guardar la configuración' }]
      }));
      return false;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Actualizar configuración parcial
  const updateConfig = (updates: Partial<StreamerConfig>) => {
    setState(prev => ({
      ...prev,
      streamerConfig: { ...prev.streamerConfig, ...updates },
      errors: [] // Limpiar errores al actualizar
    }));
  };

  // Avanzar al siguiente paso
  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4)
    }));
  };

  // Retroceder al paso anterior
  const previousStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  };

  // Limpiar errores
  const clearErrors = () => {
    setState(prev => ({ ...prev, errors: [] }));
  };

  return {
    ...state,
    checkExistingConfiguration,
    confirmStreamerIdentity,
    saveConfiguration,
    updateConfig,
    nextStep,
    previousStep,
    clearErrors,
    validateFeePercentage,
    validateAllowedAssets,
    removeDuplicateAssets
  };
};
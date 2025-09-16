export interface StreamerConfig {
  id?: string;
  name: string;
  platform: 'twitch' | 'youtube' | 'facebook' | 'tiktok' | 'other';
  isConfigured: boolean;
  isIdentityConfirmed: boolean;
  feePercentage: number; // 0-100
  allowedAssets: string[];
  stellarPublicKey?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConfigurationStep {
  step: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ConfigurationState {
  currentStep: number;
  streamerConfig: Partial<StreamerConfig>;
  errors: ValidationError[];
  isLoading: boolean;
}
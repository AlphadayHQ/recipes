import type { AlertFormConfig } from './AlertForm';

export const priceAlertConfig: AlertFormConfig = {
  type: 'price',
  showCoin: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Target Price',
  thresholdPlaceholder: 'e.g. 70000',
  showCooldown: true,
};

export const percentAlertConfig: AlertFormConfig = {
  type: 'percent',
  showCoin: true,
  showDirection: true,
  directionOptions: ['rises', 'drops'],
  showThreshold: true,
  thresholdLabel: 'Percentage (%)',
  thresholdPlaceholder: 'e.g. 10',
  showCooldown: true,
  showTimeWindow: true,
};

export const periodicAlertConfig: AlertFormConfig = {
  type: 'periodic',
  showCoin: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Target Price',
  thresholdPlaceholder: 'e.g. 70000',
  showCooldown: true,
  showFrequency: true,
};

export const volumeAlertConfig: AlertFormConfig = {
  type: 'volume',
  showCoin: true,
  showExchange: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Volume Threshold',
  thresholdPlaceholder: 'e.g. 5000000000',
  showCurrency: true,
  showCooldown: true,
};

export const marketCapAlertConfig: AlertFormConfig = {
  type: 'market-cap',
  showCoin: true,
  showDirection: true,
  directionOptions: ['above', 'below'],
  showThreshold: true,
  thresholdLabel: 'Market Cap ($)',
  thresholdPlaceholder: 'e.g. 1000000000000',
  showCurrency: true,
  showCooldown: true,
};

export const cryptoBriefingAlertConfig: AlertFormConfig = {
  type: 'crypto-briefing',
  showFrequency: true,
  showNote: true,
};

export const twitterDigestAlertConfig: AlertFormConfig = {
  type: 'twitter-digest',
  showFrequency: true,
  showNote: true,
};

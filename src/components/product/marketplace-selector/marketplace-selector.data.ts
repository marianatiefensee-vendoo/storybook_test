export const marketplaceSelectorStates = [
  'not_connected',
  'selected',
  'not_selected',
] as const;

export type MarketplaceSelectorState = (typeof marketplaceSelectorStates)[number];

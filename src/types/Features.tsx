import { IconType } from 'react-icons';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  path: string;
  status?: 'stable' | 'beta' | 'experimental';
  tags?: string[];
}

export interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  color: string;
  items: FeatureItem[];
}
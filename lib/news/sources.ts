export type CompanyKey = 'water_waste' | 'agriculture_tech' | 'sustainability' | 'climate_change';

export interface CompanyConfig {
  label: string;
  query: string;
  description: string;
  allowDomains: string[];
}

export const COMPANIES: Record<CompanyKey, CompanyConfig> = {
  water_waste: {
    label: 'Desperdício de Água',
    query: 'desperdício água agricultura portugal irrigação eficiência hídrica',
    description: 'Problemas de eficiência hídrica na agricultura',
    allowDomains: ['publico.pt', 'jn.pt', 'dn.pt', 'expresso.pt', 'observador.pt']
  },
  agriculture_tech: {
    label: 'Tecnologia Agrícola',
    query: 'tecnologia agricultura precisão IoT smart farming portugal',
    description: 'Inovação tecnológica no setor agrícola',
    allowDomains: ['sicnoticias.pt', 'tsf.pt', 'rtp.pt', 'sapo.pt']
  },
  sustainability: {
    label: 'Sustentabilidade',
    query: 'sustentabilidade agricultura impacto ambiental pegada ecológica',
    description: 'Desafios de sustentabilidade na agricultura',
    allowDomains: ['nationalgeographic.pt', 'greenpeace.org', 'wwf.pt']
  },
  climate_change: {
    label: 'Mudanças Climáticas',
    query: 'mudanças climáticas agricultura portugal seca alterações climáticas',
    description: 'Impacto das mudanças climáticas na agricultura',
    allowDomains: ['ipma.pt', 'climatempo.pt', 'ec.europa.eu']
  }
};

export function companyQuery(key: CompanyKey): string {
  return COMPANIES[key].query;
}

export function isAllowedDomain(url: string, allowedDomains: string[]): boolean {
  try {
    const domain = new URL(url).hostname;
    return allowedDomains.some(allowed => domain.includes(allowed));
  } catch {
    return false;
  }
}
import axios from 'axios';


// Define an object for API configurations
const ApiConfigs = {
  GBIF: {
    baseUrl: process.env.REACT_APP_GBIF_BASE_URL || 'https://api.gbif.org/v1',
    apiKey: process.env.REACT_APP_GBIF_API_KEY || 'your_gbif_api_key_here'
  },
  FishBase: {
    baseUrl: process.env.REACT_APP_FISHBASE_BASE_URL || 'https://fishbase.rop.taipei/api/v1',
    apiKey: process.env.REACT_APP_FISHBASE_API_KEY || 'your_fishbase_api_key_here'
  },
  OBIS: {
    baseUrl: process.env.REACT_APP_OBIS_BASE_URL || 'https://api.obis.org/v3',
    apiKey: process.env.REACT_APP_OBIS_API_KEY || 'your_obis_api_key_here'
  },
  IUCN: {
    baseUrl: process.env.REACT_APP_IUCN_BASE_URL || 'https://apiv3.iucnredlist.org/api/v3',
    apiKey: process.env.REACT_APP_IUCN_API_KEY || 'your_iucn_api_key_here'
  },
  NOAA: {
    baseUrl: process.env.REACT_APP_NOAA_BASE_URL || 'https://api.noaa.gov/v1',
    apiKey: process.env.REACT_APP_NOAA_API_KEY || 'your_noaa_api_key_here'
  },
  FAO: {
    baseUrl: process.env.REACT_APP_FAO_BASE_URL || 'https://api.apps.fao.org/v1',
    apiKey: process.env.REACT_APP_FAO_API_KEY || 'your_fao_api_key_here'
  },
  MarineRegions: {
    baseUrl: process.env.REACT_APP_MARINE_REGIONS_BASE_URL || 'https://www.marineregions.org/rest',
    apiKey: process.env.REACT_APP_MARINE_REGIONS_API_KEY || 'your_marine_regions_api_key_here'
  },
  GoogleMaps: {
    baseUrl: process.env.REACT_APP_GOOGLE_MAPS_BASE_URL || 'https://maps.googleapis.com/maps/api',
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key_here'
  }
};


// Create custom Axios instances for each API
const createApiClient = (config) => {
  const client = axios.create({
    baseURL: config.baseUrl,
    headers: {
      ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
    }
  });


  // Add request interceptor for logging and error handling
  client.interceptors.request.use(
    (request) => {
      console.log('API Request:', {
        url: request.url,
        method: request.method,
        baseURL: request.baseURL
      });
      return request;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );


  // Add response interceptor for logging and error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Response Error:', error.response?.data);
      return Promise.reject(error);
    }
  );


  return client;
};


// Create API clients
const ApiClients = {
  gbif: createApiClient(ApiConfigs.GBIF),
  fishBase: createApiClient(ApiConfigs.FishBase),
  obis: createApiClient(ApiConfigs.OBIS),
  iucn: createApiClient(ApiConfigs.IUCN),
  noaa: createApiClient(ApiConfigs.NOAA),
  fao: createApiClient(ApiConfigs.FAO),
  marineRegions: createApiClient(ApiConfigs.MarineRegions),
  googleMaps: createApiClient(ApiConfigs.GoogleMaps)
};


// Utility function to validate API configurations
const validateApiConfigs = () => {
  const missingConfigs = Object.entries(ApiConfigs)
    .filter(([_, config]) => !config.baseUrl)
    .map(([key]) => key);


  if (missingConfigs.length > 0) {
    console.warn('Missing API configurations:', missingConfigs);
  }
};


// Call validation on import
validateApiConfigs();


export { ApiConfigs, ApiClients };
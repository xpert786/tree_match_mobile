import AsyncStorage from "@react-native-async-storage/async-storage";
import { StringConstants } from "./StringConstants";

export const saveToken = async(token) => {
     try {
      if (token) {
        await AsyncStorage.setItem(StringConstants.ACCESS_TOKEN, token);
        console.log('AccessToken saved successfully:', token);
      } else {
        console.warn('No AccessToken found in response');
      }
     } catch (error) {
      console.error('Error saving AccessToken:', error);
    }
  }

 export function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}


export const soilZones = [
  // --- EXISTING ITEMS ---
  {
    type: 'sandy',
    color: 'rgba(235, 204, 150, 0.7)', // Light, pale yellow-brown
    coordinates: [
      // **REPLACE WITH ACTUAL SANDY SOIL POLYGON COORDINATES**
      { latitude: 37.820, longitude: -122.395 },
      { latitude: 37.818, longitude: -122.390 },
      { latitude: 37.815, longitude: -122.392 },
    ],
  },
  {
    type: 'clay',
    color: 'rgba(165, 82, 45, 0.7)', // Dark, reddish-brown
    coordinates: [
      // **REPLACE WITH ACTUAL CLAY SOIL POLYGON COORDINATES**
      { latitude: 37.810, longitude: -122.400 },
      { latitude: 37.808, longitude: -122.395 },
    ],
  },

  // --- NEW COMMON SOIL TYPES ---

  {
    type: 'silt',
    color: 'rgba(180, 180, 180, 0.7)', // Grayish-brown, lighter than clay
    coordinates: [
      // **REPLACE WITH ACTUAL SILT SOIL POLYGON COORDINATES**
      { latitude: 37.800, longitude: -122.390 },
      { latitude: 37.798, longitude: -122.385 },
    ],
  },
  {
    type: 'loam',
    color: 'rgba(200, 170, 100, 0.7)', // Balanced, rich brown (ideal soil color)
    coordinates: [
      // **REPLACE WITH ACTUAL LOAM SOIL POLYGON COORDINATES**
      { latitude: 37.805, longitude: -122.410 },
      { latitude: 37.803, longitude: -122.405 },
    ],
  },
  {
    type: 'peat',
    color: 'rgba(70, 70, 70, 0.7)', // Very dark brown/black (high organic matter)
    coordinates: [
      // **REPLACE WITH ACTUAL PEAT SOIL POLYGON COORDINATES**
      { latitude: 37.790, longitude: -122.415 },
      { latitude: 37.788, longitude: -122.410 },
    ],
  },
  {
    type: 'chalky',
    color: 'rgba(240, 240, 240, 0.7)', // Very light white/grey
    coordinates: [
      // **REPLACE WITH ACTUAL CHALKY SOIL POLYGON COORDINATES**
      { latitude: 37.780, longitude: -122.405 },
      { latitude: 37.778, longitude: -122.400 },
    ],
  },
  {
    type: 'rocky',
    color: 'rgba(130, 100, 80, 0.7)', // Medium stone-like grey-brown
    coordinates: [
      // **REPLACE WITH ACTUAL ROCKY SOIL POLYGON COORDINATES**
      { latitude: 37.830, longitude: -122.420 },
      { latitude: 37.828, longitude: -122.415 },
    ],
  },
  {
    type: 'saline',
    color: 'rgba(255, 255, 180, 0.7)', // Yellowish-white (salt deposits)
    coordinates: [
      // **REPLACE WITH ACTUAL SALINE SOIL POLYGON COORDINATES**
      { latitude: 37.840, longitude: -122.430 },
      { latitude: 37.838, longitude: -122.425 },
    ],
  },
];


export const soilMapStyle = [
  // --- VISIBILITY (Keep these to hide distracting features) ---
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      { "visibility": "off" }
    ]
  },

  // --- BASE LAND COLORS (Earth Tones) ---
  // Base Natural Landscape (General Land Area) - Sandy/Light Yellow Base
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      { "color": "#E6D7B4" } // A light, sandy/yellowish color (Clay Loam)
    ]
  },

  // Landcover (Vegetation/Fields) - Fertile Green
  {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry",
    "stylers": [
      { "color": "#A9C88C" } // A subtle green/fertile color (Organic/Humus-rich)
    ]
  },

  // Terrain (Hilly/Rocky Areas) - Deeper Brown/Red for mineral content
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [
      { "color": "#B4967B" } // Earthy brown/reddish color (Iron-rich/Rocky)
    ]
  },

  // Man-made areas (Cities/Developed land) - Subtle distinct color
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      { "color": "#F3EFE0" } // Very light, pale color to distinguish from natural land
    ]
  },

  // --- WATER ---
  // Water Bodies - Blue with a subtle green tint (suggesting agriculture)
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#B8D9E0" } // A light, slightly green-tinged blue
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#8fb3d9" }], // soft blue for lakes/oceans
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#406080" }],
  },

  // Water Labels (Hiding)
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },

  // --- POI / PARKS ---
  // Parks and greenery - Brighter, more defined green
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      { "color": "#81C784" } // A clean, medium green
    ]
  },

  // --- BOUNDARIES ---
  // Administrative boundaries - Subtle definition for borders
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#B4967B" }, // Using the terrain brown for borders
      { "weight": 0.8 }
    ]
  },
];
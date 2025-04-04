import axios from 'axios';

// Fetch available languages for server and client from Swagger Generator API
export const fetchLanguages = async () => {
  try {
    const response = await axios.get('https://generator.swagger.io/api/swagger.json');
    const data = response.data;
    
    // Extract client and server languages from the OpenAPI spec
    const clientLanguages = data.paths['/gen/clients/{language}'].get.parameters[0].enum;
    const serverLanguages = data.paths['/gen/servers/{framework}'].get.parameters[0].enum;
    
    return {
      clientLanguages,
      serverLanguages
    };
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

// Generate client code
export const generateClient = async (language: string, spec: any) => {
  try {
    const response = await axios.post(`https://generator.swagger.io/api/gen/clients/${language}`, {
      spec: spec
    });
    return response.data;
  } catch (error) {
    console.error('Error generating client:', error);
    throw error;
  }
};

// Generate server code
export const generateServer = async (framework: string, spec: any) => {
  try {
    const response = await axios.post(`https://generator.swagger.io/api/gen/servers/${framework}`, {
      spec: spec
    });
    return response.data;
  } catch (error) {
    console.error('Error generating server:', error);
    throw error;
  }
};

const API_ENDPOINT = 'https://5e6aedtp27.execute-api.us-east-1.amazonaws.com'; 


export const getComponent = async (name) => { 
  const response = await fetch(`${API_ENDPOINT}/${name}`); 
  return await response.json();
};

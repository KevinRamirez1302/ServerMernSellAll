export const welcomeN8N = async (userData) => {
  // Seleccionar URL según el entorno
  const url =
    process.env.NODE_ENV === 'production'
      ? process.env.N8N_PRODUCTION
      : process.env.N8N_TEST;

  if (!url) {
    console.error(
      'Error: URL del webhook de n8n no configurada para el entorno:',
      process.env.NODE_ENV
    );
    throw new Error('URL del webhook no configurada');
  }

  try {
    const fetchData = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!fetchData.ok) {
      const errorText = await fetchData.text();
      console.error('Error al enviar a n8n:', fetchData.status, errorText);
    } else {
      console.log('Datos enviados a n8n correctamente.');
    }
  } catch (error) {
    console.error('Fallo en la conexión con n8n:', error);
  }
};

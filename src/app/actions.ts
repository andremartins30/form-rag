'use server'

export interface FormData {
    trecho: string;
    comentario_professora: string;
}

export interface ApiResponse {
    success?: boolean;
    message?: string;
    data?: any;
    error?: string;
}

export async function submitForm(formData: FormData): Promise<ApiResponse> {
    try {
        const apiEndpoint = process.env.API_ENDPOINT;
        const apiToken = process.env.API_TOKEN;

        console.log('=== DEBUG API REQUEST ===');
        console.log('API Endpoint:', apiEndpoint);
        console.log('API Token:', apiToken ? `${apiToken.substring(0, 10)}...` : 'AUSENTE');
        console.log('Form Data:', formData);

        if (!apiEndpoint || !apiToken) {
            throw new Error('Configuração de API ausente. Verifique as variáveis de ambiente.');
        }

        const requestBody = {
            trecho: formData.trecho,
            comentario_professora: formData.comentario_professora,
        };

        console.log('Request Body:', requestBody);

        // Basic Auth: username "x-api-token" e password o token
        const basicAuth = Buffer.from(`x-api-token:${apiToken}`).toString('base64');
        console.log('Basic Auth Header:', `Basic ${basicAuth.substring(0, 20)}...`);

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: JSON.stringify(requestBody),
        });

        console.log('Response Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error Response Body:', errorText);
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Success Response Data:', data);

        return {
            success: true,
            message: 'Dados enviados com sucesso!',
            data,
        };
    } catch (error) {
        console.error('Erro ao enviar dados:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido ao processar a requisição',
        };
    }
}

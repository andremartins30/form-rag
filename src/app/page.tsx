'use client'

import { useState } from 'react';
import { submitForm, type ApiResponse } from './actions';
import ResponseDisplay from '@/components/ResponseDisplay';
import LogoutButton from '@/components/LogoutButton';

export default function Home() {
  const [formData, setFormData] = useState({
    trecho: '',
    comentario_professora: '',
  });
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const result = await submitForm(formData);
      setResponse(result);

      // Limpar formulário se sucesso
      if (result.success) {
        setFormData({
          trecho: '',
          comentario_professora: '',
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        error: 'Erro ao processar a requisição',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Formulário RAG
          </h1>
          <p className="text-gray-600">
            Envie trechos e comentários para processamento
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="trecho"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Trecho
              </label>
              <textarea
                id="trecho"
                name="trecho"
                rows={4}
                required
                value={formData.trecho}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-colors"
                placeholder="Digite o trecho aqui..."
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="comentario_professora"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Comentário da Professora
              </label>
              <textarea
                id="comentario_professora"
                name="comentario_professora"
                rows={4}
                required
                value={formData.comentario_professora}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-colors"
                placeholder="Digite o comentário da professora aqui..."
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processando...
                </span>
              ) : (
                'Enviar'
              )}
            </button>
          </form>
        </div>

        {response && <ResponseDisplay response={response} />}
      </div>
    </div>
  );
}

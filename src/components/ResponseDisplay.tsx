import { type ApiResponse } from '@/app/actions';

interface ResponseDisplayProps {
    response: ApiResponse;
}

interface AnalysisItem {
    id: string;
    title: string;
    category: string;
    description: string;
    comment_template: string;
    suggestion_template: string;
    tone: string;
    example: string;
    application_pattern: string;
    generalization_rule: string;
    original_section: string;
    original_comment: string;
    context_tags: string[];
    difficulty_level: string;
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
    if (response.success) {
        // Verificar se response.data é um array
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Análise Concluída
                    </h3>
                    {response.message && (
                        <p className="text-sm text-gray-600">
                            {response.message}
                        </p>
                    )}
                </div>

                {response.data && (
                    <div className="space-y-6">
                        {dataArray.map((item: AnalysisItem, index: number) => (
                            <div key={item.id || index} className="border-l-2 border-gray-300 pl-6 space-y-4">

                                <div>
                                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                                        {item.title}
                                    </h4>
                                    <div className="flex gap-2 text-xs text-gray-600 mb-4">
                                        <span>{item.category}</span>
                                        <span>·</span>
                                        <span>{item.difficulty_level}</span>
                                        <span>·</span>
                                        <span>{item.tone}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <dt className="font-medium text-gray-700 mb-1">Descrição</dt>
                                        <dd className="text-gray-600">{item.description}</dd>
                                    </div>

                                    <div>
                                        <dt className="font-medium text-gray-700 mb-1">Comentário</dt>
                                        <dd className="text-gray-600 italic">{item.comment_template}</dd>
                                    </div>

                                    <div>
                                        <dt className="font-medium text-gray-700 mb-1">Sugestão</dt>
                                        <dd className="text-gray-600 italic">{item.suggestion_template}</dd>
                                    </div>

                                    {item.example && (
                                        <div>
                                            <dt className="font-medium text-gray-700 mb-1">Exemplo</dt>
                                            <dd className="text-gray-600">{item.example}</dd>
                                        </div>
                                    )}

                                    <div>
                                        <dt className="font-medium text-gray-700 mb-1">Padrão de Aplicação</dt>
                                        <dd className="text-gray-600">{item.application_pattern}</dd>
                                    </div>

                                    <div>
                                        <dt className="font-medium text-gray-700 mb-1">Regra de Generalização</dt>
                                        <dd className="text-gray-600 whitespace-pre-line">{item.generalization_rule}</dd>
                                    </div>

                                    {item.context_tags && item.context_tags.length > 0 && (
                                        <div>
                                            <dt className="font-medium text-gray-700 mb-1">Tags</dt>
                                            <dd className="text-gray-600">{item.context_tags.join(', ')}</dd>
                                        </div>
                                    )}

                                    <div className="pt-3 border-t border-gray-200">
                                        <dt className="font-medium text-gray-700 mb-1">Trecho Original</dt>
                                        <dd className="text-gray-600 italic">&quot;{item.original_section}&quot;</dd>
                                    </div>

                                    <div>
                                        <dt className="font-medium text-gray-700 mb-1">Comentário Original</dt>
                                        <dd className="text-gray-600 italic">&quot;{item.original_comment}&quot;</dd>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (response.error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
                <h3 className="text-lg font-medium text-red-800">
                    Erro ao processar requisição
                </h3>
                <p className="mt-2 text-sm text-red-700">
                    {response.error}
                </p>
            </div>
        );
    }

    return null;
}


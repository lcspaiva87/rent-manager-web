export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Rent Manager
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sistema de gerenciamento de aluguéis
        </p>
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            Entrar no Sistema
          </button>
          <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}

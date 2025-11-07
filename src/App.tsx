import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div
      id="home-page"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8"
    >
      {/* Tailwind Verification Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Colorful Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            🎉 Tailwind CSS
          </h1>
          <p className="text-white text-center mt-2 text-sm opacity-90">
            Verification Test
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-semibold">✓ Colors working</p>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700 font-semibold">✓ Spacing working</p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700 font-semibold">✓ Borders working</p>
          </div>

          <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-purple-700 font-semibold">✓ Gradients working</p>
          </div>

          {/* Interactive Button */}
          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 active:scale-95">
            Click me to test hover effects! 🚀
          </button>

          {/* Flexbox Test */}
          <div className="flex justify-between items-center gap-4 mt-6">
            <div className="flex-1 h-20 bg-red-400 rounded-lg flex items-center justify-center text-white font-bold">
              Flex
            </div>
            <div className="flex-1 h-20 bg-yellow-400 rounded-lg flex items-center justify-center text-white font-bold">
              Box
            </div>
            <div className="flex-1 h-20 bg-green-400 rounded-lg flex items-center justify-center text-white font-bold">
              Test
            </div>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center">
          <p className="text-gray-600 text-sm">
            If you see colors and styles,{" "}
            <span className="font-bold text-green-600">
              Tailwind is working! ✨
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

export default function LandigSections() {
    return (
      <div className="min-h-screen bg-white p-10">
        <h1 className="text-4xl font-bold text-center mb-10">Welcome to Our Homepage</h1>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="bg-black text-white p-6 rounded-2xl shadow-lg my-6">
              <h2 className="text-2xl font-semibold">Card {index + 1}</h2>
              <p className="mt-2 text-gray-300">This is a simple description for card {index + 1}.</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
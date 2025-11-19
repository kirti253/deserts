export default function Hero() {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden bg-linear-to-r from-blue-400 via-blue-500 to-blue-600">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-black opacity-10" />
      </div>

      <div className="relative h-full flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Global IT <span className="text-blue-200">Solution</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-red-600">
              Company
            </h2>
            <p className="text-white text-lg md:text-xl max-w-2xl opacity-90">
              Delivering innovative IT solutions and services worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20 pointer-events-none">
        <div className="w-64 h-64 rounded-full border-4 border-white" />
      </div>
    </section>
  );
}

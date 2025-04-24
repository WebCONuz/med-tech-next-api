export default function AdminHome() {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">Statistika</h3>
      <section className="flex gap-x-4">
        <div className="border border-gray-300 bg-gray-50 rounded-md py-8 text-center w-1/4">
          <h3 className="text-2xl font-bold text-gray-400 mb-1">86</h3>
          <p className="text-sm text-gray-600">All orders</p>
        </div>
        <div className="border border-green-300 bg-green-50 rounded-md py-8 text-center w-1/4">
          <h3 className="text-2xl font-bold text-green-400 mb-1">50</h3>
          <p className="text-sm text-green-700">Completed</p>
        </div>
        <div className="border border-orange-300 bg-orange-50 rounded-md py-8 text-center w-1/4">
          <h3 className="text-2xl font-bold text-orange-400 mb-1">30</h3>
          <p className="text-sm text-orange-600">In procces</p>
        </div>
        <div className="border border-red-300 bg-red-50 rounded-md py-8 text-center w-1/4">
          <h3 className="text-2xl font-bold text-red-400 mb-1">6</h3>
          <p className="text-sm text-red-600">Rejected</p>
        </div>
      </section>
    </>
  );
}

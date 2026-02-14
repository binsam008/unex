export default function Documents() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Required Import / Export Documents
        </h1>

        <ul className="list-disc pl-6 space-y-3">
          <li>Commercial Invoice</li>
          <li>Packing List</li>
          <li>Bill of Lading / Airway Bill</li>
          <li>Certificate of Origin</li>
          <li>Import License (if applicable)</li>
          <li>Insurance Certificate</li>
          <li>Customs Declaration Form (CDF)</li>
        </ul>
      </div>
    </div>
  );
}

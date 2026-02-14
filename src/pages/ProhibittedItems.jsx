export default function ProhibitedItems() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Prohibited Items
        </h1>

        <ul className="list-disc pl-6 space-y-3 text-red-600">
          <li>Explosives & Firearms</li>
          <li>Illegal Drugs</li>
          <li>Hazardous Chemicals</li>
          <li>Flammable Liquids</li>
          <li>Counterfeit Goods</li>
          <li>Perishable Food (without permit)</li>
          <li>Live Animals (without approval)</li>
        </ul>
      </div>
    </div>
  );
}

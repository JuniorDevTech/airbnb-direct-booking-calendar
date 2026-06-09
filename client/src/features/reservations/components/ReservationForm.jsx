export default function ReservationForm({ startDate, endDate, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const guestName = e.target.guestName.value;

    onSubmit({
      guestName,
      startDate,
      endDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Client</label>

        <input
          name="guestName"
          placeholder="Nom du client"
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Arrivée</label>

          <input
            value={startDate}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Départ</label>

          <input
            value={endDate}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg">
        Enregistrer la réservation
      </button>
    </form>
  );
}

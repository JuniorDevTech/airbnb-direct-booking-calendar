import ReservationForm from "./ReservationForm";

export default function CreateReservationModal({
  open,
  onClose,
  onSubmit,
  startDate,
  endDate,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Nouvelle réservation</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <ReservationForm
          startDate={startDate}
          endDate={endDate}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

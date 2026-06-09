import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarDays } from "lucide-react";

export default function ReservationCalendar({
  events,
  onSelect,
  onEventClick,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-4 border-b border-slate-100 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <CalendarDays className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Calendrier des réservations
          </h2>

          <p className="text-sm text-slate-500">
            Gérez vos réservations et périodes bloquées
          </p>
        </div>
      </div>

      <div className="p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable
          select={onSelect}
          eventClick={onEventClick}
          events={events}
          eventContent={renderEventContent}
          height="auto"
          dayMaxEvents={2}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          buttonText={{
            today: "Aujourd'hui",
          }}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="px-2 py-1">
      <p className="truncate text-xs font-semibold">{eventInfo.event.title}</p>
    </div>
  );
}

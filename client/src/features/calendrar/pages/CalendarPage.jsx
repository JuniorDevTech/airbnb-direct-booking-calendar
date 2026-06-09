/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CalendarDays, Home, Ban, CheckCircle } from "lucide-react";

import ReservationCalendar from "../components/ReservationCalendar";
import CalendarLegend from "../components/CalendarLegend";
import ActionSelectorModal from "../components/ActionSelectorModal";
import BlockDatesModal from "../components/BlockDatesModal";
import ReservationDetailsModal from "../components/ReservationDetailsModal";
import CreateReservationModal from "../../reservations/components/CreateReservationModal";

import usePropertyStore from "../../properties/store/propertyStore";

import { getCalendarEvents } from "../services/calendarApi";

import {
  createReservation as createReservationApi,
  blockReservation,
  deleteReservation,
} from "../../reservations/service/reservationApi";

import { checkDateConflict } from "../../../utils/checkDateConflict";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const properties = usePropertyStore((state) => state.properties);
  const fetchProperties = usePropertyStore((state) => state.fetchProperties);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const loadCalendar = async () => {
      if (!selectedProperty) {
        setEvents([]);
        return;
      }

      try {
        setLoading(true);

        const data = await getCalendarEvents(selectedProperty);

        setEvents(data || []);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger le calendrier");
      } finally {
        setLoading(false);
      }
    };

    loadCalendar();
  }, [selectedProperty]);

  const handleSelect = (info) => {
    setSelectedRange({
      start: info.startStr,
      end: info.endStr,
    });

    setActionModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = info.event;

    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      source: event.extendedProps?.source,
    });
  };

  const closeActionModal = () => {
    setActionModalOpen(false);
    setSelectedRange(null);
  };

  const closeReservationModal = () => {
    setReservationModalOpen(false);
    setSelectedRange(null);
  };

  const closeBlockModal = () => {
    setBlockModalOpen(false);
    setSelectedRange(null);
  };

  const openReservationModal = () => {
    setActionModalOpen(false);
    setReservationModalOpen(true);
  };

  const openBlockModal = () => {
    setActionModalOpen(false);
    setBlockModalOpen(true);
  };

  const createReservation = async (data) => {
    try {
      const conflict = checkDateConflict(events, data.startDate, data.endDate);

      if (conflict) {
        toast.error("Ces dates sont déjà occupées");
        return;
      }

      await createReservationApi({
        propertyId: selectedProperty,
        title: data.guestName,
        startDate: data.startDate,
        endDate: data.endDate,
        source: "DIRECT",
      });

      const updated = await getCalendarEvents(selectedProperty);

      setEvents(updated);

      toast.success("Réservation créée avec succès");

      closeReservationModal();
    } catch (error) {
      console.error(error);

      toast.error("Erreur lors de la création de la réservation");
    }
  };

  const blockDates = async (data) => {
    try {
      const conflict = checkDateConflict(events, data.startDate, data.endDate);

      if (conflict) {
        toast.error("Ces dates sont déjà occupées");
        return;
      }

      await blockReservation({
        propertyId: selectedProperty,
        title: data.reason || "Bloqué",
        startDate: data.startDate,
        endDate: data.endDate,
      });

      const updated = await getCalendarEvents(selectedProperty);

      setEvents(updated);

      toast.success("Dates bloquées avec succès");

      closeBlockModal();
    } catch (error) {
      console.error(error);

      toast.error("Erreur lors du blocage des dates");
    }
  };

  const handleDeleteReservation = async (reservation) => {
    try {
      await deleteReservation(reservation.id);

      const updated = await getCalendarEvents(selectedProperty);

      setEvents(updated);

      setSelectedEvent(null);

      toast.success("Réservation supprimée");
    } catch (error) {
      console.error(error);

      toast.error("Erreur suppression");
    }
  };

  const airbnbCount = events.filter(
    (event) => event.extendedProps?.source === "AIRBNB",
  ).length;

  const directCount = events.filter(
    (event) => event.extendedProps?.source === "DIRECT",
  ).length;

  const blockedCount = events.filter(
    (event) => event.extendedProps?.source === "BLOCKED",
  ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <CalendarDays className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-bold">Calendrier des réservations</h1>

            <p className="mt-2 text-blue-100">
              Gérez les disponibilités, réservations et blocages de tous vos
              logements.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />

              <div>
                <p className="font-semibold">Synchronisation active</p>

                <p className="text-sm text-blue-100">Calendrier à jour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Airbnb</h3>

            <CalendarDays className="text-red-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{airbnbCount}</p>

          <p className="mt-1 text-xs text-slate-500">Réservations Airbnb</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Directes</h3>

            <CalendarDays className="text-blue-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{directCount}</p>

          <p className="mt-1 text-xs text-slate-500">Réservations directes</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Dates bloquées</h3>

            <Ban className="text-amber-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{blockedCount}</p>

          <p className="mt-1 text-xs text-slate-500">Indisponibilités</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Total</h3>

            <CheckCircle className="text-green-500" />
          </div>

          <p className="mt-3 text-3xl font-bold">{events.length}</p>

          <p className="mt-1 text-xs text-slate-500">Événements</p>
        </div>
      </div>

      {/* SELECT PROPERTY */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Logement
        </label>

        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none">
          <option value="">Sélectionner un logement</option>

          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedProperty ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Home className="mx-auto mb-4 h-12 w-12 text-slate-400" />

          <h3 className="text-xl font-semibold text-slate-900">
            Aucun logement sélectionné
          </h3>

          <p className="mt-2 text-slate-500">
            Choisissez un logement pour consulter son calendrier.
          </p>
        </div>
      ) : loading ? (
        <div className="flex h-[400px] items-center justify-center rounded-3xl bg-white">
          Chargement du calendrier...
        </div>
      ) : (
        <>
          <CalendarLegend />

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <ReservationCalendar
              events={events}
              onSelect={handleSelect}
              onEventClick={handleEventClick}
            />
          </div>
        </>
      )}

      <ActionSelectorModal
        open={actionModalOpen}
        onClose={closeActionModal}
        onReservation={openReservationModal}
        onBlock={openBlockModal}
      />

      <CreateReservationModal
        open={reservationModalOpen}
        onClose={closeReservationModal}
        onSubmit={createReservation}
        startDate={selectedRange?.start || ""}
        endDate={selectedRange?.end || ""}
      />

      <BlockDatesModal
        open={blockModalOpen}
        onClose={closeBlockModal}
        onSubmit={blockDates}
        startDate={selectedRange?.start || ""}
        endDate={selectedRange?.end || ""}
      />

      <ReservationDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onDelete={handleDeleteReservation}
      />
    </div>
  );
}

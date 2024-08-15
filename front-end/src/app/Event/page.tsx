"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Navbar from "@/components/molecules/nav";
import axios from "axios";
import Footer from "@/components/molecules/Footer";
import { Modal } from "react-bootstrap"; 

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  price: number; // Ensure price is always a number
  description?: string;
}

export default function Home() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showModal, setShowModal] = useState(false); // Authentication prompt modal state
  const [eventToJoin, setEventToJoin] = useState<Event | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events")
      .then((response) => {
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  function handleEventClick(eventInfo: { event: { id: string } }) {
    const id = Number(eventInfo.event.id);
    setEventToJoin(allEvents.find((event) => event.id === id) || null);
    setShowJoinModal(true);
  }

  function handleJoin() {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      setShowModal(true); 
      return;
    }

    if (eventToJoin && userId !== null) {
      axios
        .post(`http://localhost:8000/api/joinEvent`, {
          eventId: eventToJoin.id,
          userId: userId,
        })
        .then(() => {
          alert("Successfully joined the event!");
          setShowJoinModal(false);
        })
        .catch((error) => {
          console.error("Error joining event:", error);
          alert("Failed to join the event. Please try again.");
        });
    }
  }

  function handleCloseModal() {
    setShowJoinModal(false);
    setEventToJoin(null);
    setShowModal(false); 
  }

  function formatPrice(price: number | undefined): string {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    return "$0.00";
  }

  return (
    <>
      <Navbar />
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={allEvents as Event[]}
              nowIndicator={true}
              editable={false}
              droppable={false}
              selectable={true}
              eventClick={(data) => handleEventClick(data)}
              height="75vh"
            />
          </div>
        </div>
        {/* Join Event Modal */}
        <Transition.Root show={showJoinModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 px-6 py-4 text-white">
                      <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                          <CheckIcon
                            className="h-10 w-10 text-teal-300"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <Dialog.Title
                            as="h3"
                            className="text-2xl font-bold leading-6 text-white"
                          >
                            {eventToJoin?.title}
                          </Dialog.Title>
                          <div className="mt-4">
                            <p className="text-sm text-white">
                              <strong>Description:</strong>{" "}
                              {eventToJoin?.description ||
                                "No description available."}
                            </p>
                            <p className="text-sm text-white mt-2">
                              <strong>Price:</strong>{" "}
                              {formatPrice(eventToJoin?.price)}
                            </p>
                            <p className="text-sm text-white mt-2">
                              <strong>Start:</strong>{" "}
                              {new Date(eventToJoin?.start).toLocaleString()}
                            </p>
                            <p className="text-sm text-white mt-2">
                              <strong>All Day:</strong>{" "}
                              {eventToJoin?.allDay ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
                        onClick={handleJoin}
                      >
                        Join
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:ring-gray-400 sm:ml-3 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Authentication Prompt Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header
            closeButton
            className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white"
          >
            <Modal.Title>Please Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mb-4">
                <svg
                  className="h-12 w-12 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4.5m0 0v4.5m0-4.5H9m3 0h3m-1.5-8a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"
                  ></path>
                </svg>
              </div>
              <p className="text-lg font-semibold">
                You need to be logged in to join an event.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Please log in to access this feature.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/Connexion")}
            >
              Log In
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </main>
      <Footer />
    </>
  );
}

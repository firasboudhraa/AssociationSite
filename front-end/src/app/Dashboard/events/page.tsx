"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function EventPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [eventToJoin, setEventToJoin] = useState<Event | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        setAllEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    // Retrieve user ID or session information if needed
    // setUserId(...);
  }, []);

  function handleEventClick(eventInfo: { event: { id: string } }) {
    const id = Number(eventInfo.event.id);
    setEventToJoin(allEvents.find(event => event.id === id) || null);
    setShowJoinModal(true);
  }

  function handleJoin() {
    if (eventToJoin && userId !== null) {
      axios.post(`http://localhost:8000/api/joinEvent`, {
        eventId: eventToJoin.id,
        userId: userId
      })
        .then(() => {
          toast.success('Successfully joined the event!');
          setShowJoinModal(false);
        })
        .catch(error => {
          console.error('Error joining event:', error);
          toast.error('Failed to join the event. Please try again.');
        });
    }
  }

  function handleCloseModal() {
    setShowJoinModal(false);
    setEventToJoin(null);
  }

  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="font-bold text-2xl text-white">Event Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[var(--bgSoft)]">
        <div className="grid grid-cols-10 gap-8 w-full">
          <div className="col-span-8">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={allEvents as Event[]}
              nowIndicator={true}
              editable={false}
              droppable={false}
              selectable={true}
              eventClick={(data) => handleEventClick(data)}
              themeSystem="bootstrap"
              eventClassNames="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-3 shadow-lg"
              height="auto"
              contentHeight="auto"
            />
          </div>
        </div>

        {/* Join Event Modal */}
        <Transition.Root show={showJoinModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-6 pb-6 pt-5 sm:p-8 sm:pb-6">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-12 sm:w-12">
                          <CheckIcon className="h-8 w-8 text-teal-600" aria-hidden="true" />
                        </div>
                        <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                            Join Event
                          </Dialog.Title>
                          <div className="mt-3">
                            <p className="text-base text-gray-600">
                              Are you sure you want to join this event?
                            </p>
                            <p className="text-base text-gray-700 mt-2 font-semibold">
                              {eventToJoin?.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-teal-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto" onClick={handleJoin}>
                        Join
                      </button>
                      <button type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:ring-gray-400 sm:ml-3 sm:w-auto" onClick={handleCloseModal}>
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  );
}

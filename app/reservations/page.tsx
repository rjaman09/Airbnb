import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import ReservationsClient from "./ReservationsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthroized" subtitle="Please login to book reservation" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks likes you don't have reservations on your properties" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );

};

export default ReservationsPage;
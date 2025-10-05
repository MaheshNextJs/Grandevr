import { notFound } from "next/navigation";
import RoomDetailsClient from "../../../../components/user/rooms/RoomDetails";
import { ROOMS } from "../data";

type PageProps = {
  params: { id: string };
};

export default function RoomDetailsPage({ params }: PageProps) {
  const id = Number(params.id);
  const room = ROOMS.find((r) => r.id === id);

  if (!room) return notFound();

  return <RoomDetailsClient room={room} />;
}

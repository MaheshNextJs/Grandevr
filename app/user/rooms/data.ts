export type Room = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  features: string[];
};

export const ROOMS: Room[] = [
  {
    id: 1,
    title: "Deluxe King Room",
    price: 199,
    description: "Spacio room with king bed, balcony & city view.",
    image: "/images/deluxekingroom.png",
    features: [
      "Kitchen",
      "WiFi",
      "WashingMachine",
      "Pool",
      "Television",
      "Barbecue",
    ],
  },
  {
    id: 2,
    title: "Deluxe Suit Room",
    price: 599,
    description: "Spacious room with king bed, balcony & city view.",
    image: "/images/deluxekingroom.png",
    features: [
      "Kitchen",
      "WiFi",
      "WashingMachine",
      "Pool",
      "Television",
      "Barbecue",
    ],
  },
];

export const FEATURE_ICONS: Record<string, string> = {
  Kitchen: "/icons/kitchen.png",
  WiFi: "/icons/wifi.png",
  WashingMachine: "/icons/washing machine.png", // rename file: avoid spaces
  Pool: "/icons/pool.png",
  Television: "/icons/tv.png",
  Barbecue: "/icons/barbecue.png",
};

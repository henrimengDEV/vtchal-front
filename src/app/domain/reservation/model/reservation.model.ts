export interface ReservationModel {
  id: string
  modele: string // Toyota bZ4X,
  motorisation: string // 100% électrique,
  couleursVoiture: string[] // [noir, gris métal, blanc perle],
  plaqueImmatriculation: string // AB-123-CD,
  nomClient: string // Jean Dupont,
  pointDePriseEnCharge: string // 12 Rue de la Paix, Paris,
  destination: string // Gare Montparnasse,
  nombreDePersonnes: number // 2,
  bagages: string[] // [sac à dos, valise]
  status: 'todo' | 'in-progress' | 'done'
}

export const mockReservation: ReservationModel = {
  id: "1",
  modele: "Toyota bZ4X",
  motorisation: "100% électrique",
  couleursVoiture: ["noir", "gris métal", "blanc perle"],
  plaqueImmatriculation: "AB-123-CD",
  nomClient: "Jean Dupont",
  pointDePriseEnCharge: "12 Rue de la Paix, Paris",
  destination: "Gare Montparnasse",
  nombreDePersonnes: 2,
  bagages: ["sac à dos", "valise"],
  status: 'todo'
}

export const mockReservations: ReservationModel[] = [
  {
    id: "1",
    modele: "Toyota bZ4X",
    motorisation: "100% électrique",
    couleursVoiture: ["noir", "gris métal", "blanc perle"],
    plaqueImmatriculation: "AB-123-CD",
    nomClient: "Jean Dupont",
    pointDePriseEnCharge: "12 Rue de la Paix, Paris",
    destination: "Gare Montparnasse",
    nombreDePersonnes: 2,
    bagages: ["sac à dos", "valise"],
    status: 'done'
  },
  {
    id: "2",
    modele: "Tesla Model 3",
    motorisation: "Électrique",
    couleursVoiture: ["bleu nuit", "blanc"],
    plaqueImmatriculation: "BC-234-DE",
    nomClient: "Claire Martin",
    pointDePriseEnCharge: "Aéroport CDG, Terminal 2",
    destination: "Hôtel Pullman, Tour Eiffel",
    nombreDePersonnes: 1,
    bagages: ["valise"],
    status: 'done'
  },
  {
    id: "3",
    modele: "Peugeot 508",
    motorisation: "Hybride",
    couleursVoiture: ["gris clair"],
    plaqueImmatriculation: "CD-345-EF",
    nomClient: "Marc Lemoine",
    pointDePriseEnCharge: "Station Lyon Part-Dieu",
    destination: "Palais des Congrès",
    nombreDePersonnes: 3,
    bagages: [],
    status: 'done'
  },
  {
    id: "4",
    modele: "Renault Mégane E-Tech",
    motorisation: "100% électrique",
    couleursVoiture: ["jaune", "noir"],
    plaqueImmatriculation: "DE-456-FG",
    nomClient: "Amina Sy",
    pointDePriseEnCharge: "Université Paris-Saclay",
    destination: "Orly Sud",
    nombreDePersonnes: 2,
    bagages: ["sac à dos"],
    status: 'todo'
  },
  {
    id: "5",
    modele: "BMW iX3",
    motorisation: "Électrique",
    couleursVoiture: ["bleu", "gris foncé"],
    plaqueImmatriculation: "EF-567-GH",
    nomClient: "Julien Petit",
    pointDePriseEnCharge: "Rue Lafayette, Paris 9e",
    destination: "Gare Saint-Lazare",
    nombreDePersonnes: 4,
    bagages: ["valise", "sac à dos"],
    status: 'todo'
  },
  {
    id: "6",
    modele: "Kia EV6",
    motorisation: "100% électrique",
    couleursVoiture: ["rouge", "noir"],
    plaqueImmatriculation: "FG-678-HI",
    nomClient: "Nora Berthier",
    pointDePriseEnCharge: "La Défense, Tour Total",
    destination: "Roissy Terminal 1",
    nombreDePersonnes: 1,
    bagages: ["valise"],
    status: 'todo'
  },
  {
    id: "7",
    modele: "Citroën ë-C4",
    motorisation: "100% électrique",
    couleursVoiture: ["bleu glacier"],
    plaqueImmatriculation: "GH-789-IJ",
    nomClient: "Louis Garnier",
    pointDePriseEnCharge: "Montparnasse Bienvenüe",
    destination: "Quai Branly",
    nombreDePersonnes: 2,
    bagages: [],
    status: 'in-progress'
  },
  {
    id: "8",
    modele: "Hyundai Ioniq 5",
    motorisation: "Électrique",
    couleursVoiture: ["argent", "blanc"],
    plaqueImmatriculation: "HI-890-JK",
    nomClient: "Sophie Moreau",
    pointDePriseEnCharge: "Hôtel Marriott Champs-Élysées",
    destination: "Musée d'Orsay",
    nombreDePersonnes: 2,
    bagages: ["sac à dos"],
    status: 'todo'
  },
  {
    id: "9",
    modele: "Skoda Enyaq",
    motorisation: "100% électrique",
    couleursVoiture: ["vert olive", "gris"],
    plaqueImmatriculation: "IJ-901-KL",
    nomClient: "Karim Bensalem",
    pointDePriseEnCharge: "Gare de Lyon",
    destination: "Bois de Vincennes",
    nombreDePersonnes: 3,
    bagages: ["valise"],
    status: 'todo'
  },
  {
    id: "10",
    modele: "Mercedes EQB",
    motorisation: "100% électrique",
    couleursVoiture: ["noir", "bordeaux"],
    plaqueImmatriculation: "JK-012-LM",
    nomClient: "Isabelle Charron",
    pointDePriseEnCharge: "Place Vendôme",
    destination: "Aéroport Orly Ouest",
    nombreDePersonnes: 2,
    bagages: ["sac à dos", "valise"],
    status: 'todo'
  }
];

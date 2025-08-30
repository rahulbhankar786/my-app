declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

export interface EventItem {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  isFavorite?: boolean;
  sales: {
    public: {
      startDateTime: string;
      startTBD: boolean;
      startTBA: boolean;
      endDateTime: string;
    };
    presales: Presale[];
  };
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
      dateTBD: boolean;
      dateTBA: boolean;
      timeTBA: boolean;
      noSpecificTime: boolean;
    };
    timezone: string;
    status: { code: string };
    spanMultipleDays: boolean;
  };
  classifications: Classification[];
  promoter: Promoter;
  promoters: Promoter[];
  info?: string;
  pleaseNote?: string;
  products?: Product[];
  seatmap?: { staticUrl: string };
  accessibility?: { ticketLimit: number };
  ticketLimit?: { info: string };
  ageRestrictions?: { legalAgeEnforced: boolean };
  ticketing?: {
    safeTix: { enabled: boolean };
    allInclusivePricing: { enabled: boolean };
  };
  _links: {
    self: { href: string };
    attractions: { href: string }[];
    venues: { href: string }[];
  };
  _embedded: {
    venues: Venue[];
    attractions: Attraction[];
  };
}

export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface Presale {
  startDateTime: string;
  endDateTime: string;
  name: string;
}

export interface Classification {
  primary: boolean;
  segment: IdName;
  genre: IdName;
  subGenre: IdName;
  type: IdName;
  subType: IdName;
  family: boolean;
}

export interface IdName {
  id: string;
  name: string;
}

export interface Promoter {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  name: string;
  id: string;
  url: string;
  type: string;
  classifications: Classification[];
}

export interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images?: Image[];
  postalCode: string;
  timezone: string;
  city: { name: string };
  state: { name: string; stateCode: string };
  country: { name: string; countryCode: string };
  address: { line1: string };
  location: { longitude: string; latitude: string };
  markets?: { name: string; id: string }[];
  dmas?: { id: number }[];
  boxOfficeInfo?: BoxOfficeInfo;
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
  generalInfo?: { generalRule: string; childRule: string };
  upcomingEvents: {
    archtics?: number;
    ticketmaster?: number;
    _total: number;
    _filtered: number;
  };
  _links: { self: { href: string } };
}

export interface BoxOfficeInfo {
  phoneNumberDetail: string;
  openHoursDetail: string;
  acceptedPaymentDetail: string;
  willCallDetail: string;
}

export interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks?: {
    twitter?: { url: string }[];
    facebook?: { url: string }[];
    wiki?: { url: string }[];
    instagram?: { url: string }[];
    homepage?: { url: string }[];
  };
  aliases?: string[];
  images?: Image[];
  classifications?: Classification[];
  upcomingEvents: {
    tmr?: number;
    ticketmaster?: number;
    _total: number;
    _filtered: number;
  };
  _links: { self: { href: string } };
}


export interface AppState {
  events: Event[];
  setEvents: NullableFunction;
}

type ErrorsType = {
  email?: string;
  password?: string;
  name?: string;
  city?: string;
};
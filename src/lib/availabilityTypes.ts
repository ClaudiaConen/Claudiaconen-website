export interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface AvailabilityException {
  id: string;
  date: string;
  is_available: boolean;
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
}

export interface BookingWithType {
  id: string;
  customer_name: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  appointment_types: {
    name: string;
    color: string;
  } | null;
}

export const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
export const DAY_NAMES_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
export const MONTH_NAMES = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
export const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
export const HOUR_START = 7;
export const HOUR_END = 21;

export function generateTimeOptions(): string[] {
  const opts: string[] = [];
  for (let h = HOUR_START; h <= HOUR_END; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === HOUR_END && m > 0) break;
      opts.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return opts;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatDateDE(dateStr: string): string {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateStr + 'T00:00:00'));
}

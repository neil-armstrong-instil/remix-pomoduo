export interface Room {
  room: string;
  created_at: Date;
  updated_at: Date;
  timer_end_time: Date;
  timer_paused_time: Date | null;
}
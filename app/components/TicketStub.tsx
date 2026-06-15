import { event } from "@/lib/event";
import { Countdown } from "./Countdown";
import { SparkGlyph } from "./Brand";

// The signature artifact: turns the event details + countdown into a
// tangible "admit one" ticket instead of a centered text row.
export function TicketStub() {
  return (
    <div className="ticket w-full max-w-2xl overflow-hidden text-left">
      <div className="ticket-flame" />
      <div className="flex flex-col sm:flex-row">
        {/* Main stub — details + countdown */}
        <div className="flex-1 p-6 sm:p-7">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em]">
            <div className="font-bold text-navy">{event.dateLabel}</div>
            <div className="mt-1 text-muted">
              {event.venue.name} · {event.venue.cityState}
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em]">
            <span className="font-bold text-ember">Free entry</span>
            <SparkGlyph className="h-2.5 w-2.5" />
            <span className="text-muted">{event.venue.capacity} seats</span>
          </div>
          <div className="mt-5">
            <Countdown iso={event.startsAtISO} />
          </div>
        </div>

        {/* Perforated seam: horizontal on mobile, vertical on sm+ */}
        <div className="ticket-seam border-t-2 border-dashed sm:border-l-2 sm:border-t-0" />

        {/* Counterfoil */}
        <div className="flex items-center justify-between gap-4 bg-cream-2/50 px-5 py-4 sm:flex-col sm:justify-center sm:py-6">
          <div className="text-center font-mono uppercase tracking-[0.2em]">
            <div className="text-[0.62rem] font-bold text-ember">Admit One</div>
            <div className="mt-1 text-[0.62rem] text-muted">No. 0500</div>
          </div>
          <div
            className="hidden font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted sm:block"
            style={{ writingMode: "vertical-rl" }}
          >
            Ignite Summit
          </div>
        </div>
      </div>
    </div>
  );
}

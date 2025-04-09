import { Calendar } from '@widgets/calendar/ui/Calendar';
import { EventModal } from '@features/eventManagement';

export const App = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="app-root">
      <header className="bg-white border-b border-calendar-border px-6 py-3">
        <h1 className="text-2xl font-semibold text-calendar-blue">Calendar</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Calendar />
        <EventModal />
      </main>
    </div>
  );
};

export default App;

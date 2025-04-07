import { HashVerifier } from './components/HashVerifier';
import { OutcomeVerifier } from './components/OutcomeVerifier';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <div className="w-full max-w-6xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HashVerifier />
          <OutcomeVerifier />
        </div>
      </div>
    </div>
  );
}

export default App;

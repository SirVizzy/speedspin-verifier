import { OutcomeVerifier } from './components/OutcomeVerifier';

// TODO:
// - Add a few tests to ensure the outcome verifier works
// - Add query params to fill the form

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <div className="w-full max-w-2xl">
        <OutcomeVerifier />
      </div>
    </div>
  );
};

export default App;

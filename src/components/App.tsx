import { OutcomeVerifier } from './OutcomeVerifier';

export const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <div className="w-full max-w-xl">
        <OutcomeVerifier />
      </div>
    </div>
  );
};

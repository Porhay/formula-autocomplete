import '../styles/Main.scss';
import { useEffect, useState } from 'react';

interface IState {}

const MainPage = () => {

  // LOCAL STATE
  const updateState = (newState: Partial<IState>): void => setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({});

  // FUNCTIONS
  // COMPONENTS

  return (
    <div className="main-page-container">
      halo from main
    </div>
  );
};

export default MainPage;

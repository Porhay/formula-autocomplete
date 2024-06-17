import '../styles/Main.scss';
import { create } from 'zustand'
import FormulaInput from '../components/FormulaInput';


const useStore = create((set) => ({
  count: 1,
  inc: () => set((state: { count: number; }) => ({ count: state.count + 1 })),
}))

const MainPage = () => {

  return (
    <div className="main-page-container">
      <FormulaInput />
    </div>
  );
};

export default MainPage;

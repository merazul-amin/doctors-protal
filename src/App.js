import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <Toaster position='top-center'></Toaster>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;

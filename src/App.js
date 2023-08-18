import './App.css';
import { useRoutes } from 'react-router';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored" />
      {useRoutes(Routes())}
    </div>
  );
};

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './pages/Hackathons/HackComponents/Hacks/Redux/store.jsx'
import UserLoginStore from './contexts/UserLoginStore.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <UserLoginStore>
        <App />
        </UserLoginStore>
    </Provider>
)

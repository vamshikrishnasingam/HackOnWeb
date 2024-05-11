import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserLoginStore from './contexts/UserLoginStore.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserLoginStore>
            <App />
    </UserLoginStore>
)

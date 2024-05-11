import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserLoginStore from './contexts/UserLoginStore.jsx'
import CommunityStore from './contexts/CommunityStore.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserLoginStore>
        <CommunityStore>
            <App />
        </CommunityStore>
    </UserLoginStore>
)

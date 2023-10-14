import { createRoot } from 'react-dom/client'

import App from './components/app/App'

import './components/style.scss'

const root = createRoot(document.getElementById('root'))
root.render(<App />)

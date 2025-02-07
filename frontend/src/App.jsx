
import { BrowserRouter } from 'react-router-dom'
import Container from './UI/container/Container'
import Navbar from './components/Navbar/Navbar'
import AppRouter from './router/AppRouter'
import "./styles/App.css"

function App() {
   return (
      <>
         <BrowserRouter>
            <Container>
               <Navbar />
               <AppRouter />
            </Container>
         </BrowserRouter>
      </>
   )
}


export default App

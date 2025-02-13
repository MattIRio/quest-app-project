
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Container from './UI/container/Container'
import Navbar from './components/Navbar/Navbar'
import AppRouter from './router/AppRouter'
import "./styles/App.css"
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './router/ErrorFallback'

function App() {


   return (
      <>
         <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback} >
               <Container>
                  <Navbar />
                  <AppRouter />
               </Container>
            </ErrorBoundary>

         </BrowserRouter>
      </>
   )
}


export default App

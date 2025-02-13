import { useNavigate } from "react-router-dom";
import ContainerBlurBg from "../UI/container/ContainerBlurBg";
import Container from "../UI/container/Container";
import Navbar from "../components/Navbar/Navbar";
import { MyButton } from "../UI/button/MyButton";

const ErrorFallback = ({
   error
}) => {
   const navigate = useNavigate()
   const resetErrorBoundary = () => {
      navigate("auth")
   }
   return (
      <Container>
         <Navbar />
         <ContainerBlurBg>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
            <MyButton onClick={resetErrorBoundary} text={"Home"}></MyButton>
         </ContainerBlurBg>
      </Container>

   );
};

export default ErrorFallback;
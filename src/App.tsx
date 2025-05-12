import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter";
import { useAppDispatch } from "./Firebase/auth/store";
import { useEffect } from "react";
import { checkAuthThunk } from "./Firebase/auth/store/authThunks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

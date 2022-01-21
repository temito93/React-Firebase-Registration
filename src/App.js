import "./App.css";
import Registration from "./components/Registration/Registration";
import { RegistrationProvider } from "./store/registration-context";
function App() {
  console.log("App");
  return (
    <div className="App">
      <RegistrationProvider>
        <Registration />
      </RegistrationProvider>
    </div>
  );
}

export default App;

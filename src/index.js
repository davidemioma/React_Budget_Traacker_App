import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SpeechProvider } from "@speechly/react-client";
import store from "./store/expense-Redux";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <SpeechProvider appId="e12f1761-728a-45d7-a51e-94f38ea650d4" language="en-US">
    <Provider store={store}>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);

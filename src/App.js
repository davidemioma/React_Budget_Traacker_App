import React from "react";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import {
  ErrorPanel,
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="desktop">
          <Details title="Income" />
        </div>

        <div>
          <Main />
        </div>

        <div className="mobile">
          <Details title="Income" />
        </div>

        <Details title="Expense" />
      </div>

      <PushToTalkButtonContainer>
        <PushToTalkButton />

        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";

import store from "./store";
import { ScreensContainer } from "./screens";

export default function App() {
   return (
      <Provider store={store}>
         <ApplicationProvider {...eva} theme={eva.light}>
            <ScreensContainer />
         </ApplicationProvider>
      </Provider>
   );
}

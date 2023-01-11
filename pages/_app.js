import MainApp from "../components/MainApp/MainApp";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../Redux/Store"
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainApp>
        <Component {...pageProps} />
      </MainApp>
    </Provider>
  );
}

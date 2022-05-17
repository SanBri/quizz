import { Provider } from "react-redux";
import { useEffect } from "react";

import store from "../store";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import "../styles.scss";

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;

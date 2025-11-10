import { useEffect } from 'react';
import { Header } from "../../components/components/Header"
import { Screen } from "../../components/components/Screen"
import { Footer } from "../../components/components/Footer"

export function Login() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

  return (
    <>
      <Header 
        theme="dark"
        type="main"
        className={{}}
        logotipoVector="vector-4.svg"/>
      <Screen />
      <Footer />
    </>
  );
}
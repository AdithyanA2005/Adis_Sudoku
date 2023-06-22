import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

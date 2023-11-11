import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Form } from "./page/Form"
import { Record } from "./page/Record";
import { Main } from "./page/Main";
import { Doctor } from "./page/Doctor";
import { Profile } from "./page/Profile";
import { Update } from "./page/Update";
import { Adddoctor } from "./page/Adddoctor";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
          </Route>
          <Route path="/callpatient/:id" element={<Record></Record>}></Route>
          <Route path="/doctor" element={<Doctor/>}></Route>
          <Route path="/addpatient" element={<Form></Form>}></Route>
          <Route path="/addpatient/:id" element={<Update></Update>}></Route>
          <Route path="/profile/:id" element={<Profile></Profile>}></Route>
          <Route path="/adddoctor" element={<Adddoctor />}/>
          <Route path="/record" element={<Record />}>
          </Route>

        </Routes >
      </Router >
    </div>
  );
}

export default App;

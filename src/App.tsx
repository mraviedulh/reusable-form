import "./App.css";
import { useState } from "react";
import { ComboboxBasic } from "./components/form/combobox";
import { ComboboxInvalid } from "./components/form/comboboxinvalid";
import { Button } from "./components/ui/button";
import { InputField } from "./components/form/inputfield";
import { InputDisabled } from "./components/form/inputdisable";
import { DatePickerSimple } from "./components/form/datepicker";
import { DatePickerWithRange } from "./components/form/rangedatepicker";

function App() {
  // (1) Username dari InputField -> dipakai InputDisabled untuk membentuk email
  const [username, setUsername] = useState("");

  // (4) State combobox: nilai terpilih + status submit untuk validasi
  const [framework, setFramework] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isFrameworkValid = framework !== "";
  const showComboboxInvalid = submitted && !isFrameworkValid;

  function handleFrameworkChange(value: string) {
    setFramework(value);
    // begitu user memilih value, otomatis kembali ke tampilan basic
    if (value) setSubmitted(false);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <div className="block h-screen items-center justify-center">
      <div className="m-4 flex flex-col ">
        <InputField value={username} onChange={setUsername} />
      </div>
      <div className="m-4 flex flex-col ">
        <InputDisabled username={username} />
      </div>
      <div className="m-4 flex flex-col">
        <div className="flex">
          <div className="my-4 flex flex-col ">
            <DatePickerSimple />
          </div>
          <div className="m-4 flex flex-col ">
            {showComboboxInvalid ? (
              <ComboboxInvalid onValueChange={handleFrameworkChange} />
            ) : (
              <ComboboxBasic
                value={framework}
                onValueChange={handleFrameworkChange}
              />
            )}
          </div>
          <div className="m-4 flex flex-col ">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="m-4 flex justify-end">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Records from "../components/Records/Records";
import axios from "axios";
import { BACKEND_PATHS } from "../packs/constants";

function Home() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.RECORDS}`)
      .then(response => {
        setRecords(response.data);
      }).catch(error => console.log(error))
  }, [])

  return (
    <div>
      <Header />
      <Records records={records} owner={true}/>
    </div>
  );
}

export default Home;

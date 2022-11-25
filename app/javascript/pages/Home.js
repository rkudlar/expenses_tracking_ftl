import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Records from "../components/Records/Records";
import axios from "axios";
import { BACKEND_PATHS } from "../packs/constants";
import Filter from "../components/Records/Filter";

function Home() {
  const [records, setRecords] = useState([]);
  const [recordsRefresh, setRecordsRefresh] = useState(false);

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.RECORDS}`)
      .then(response => {
        setRecords(response.data);
        setRecordsRefresh(false);
      }).catch(error => console.log(error))
  }, [recordsRefresh])

  return (
    <div>
      <Header />
      <Filter stateChangerRecords={setRecords} />
      <Records recordsChanger={setRecordsRefresh} records={records} owner={true}/>
    </div>
  );
}

export default Home;

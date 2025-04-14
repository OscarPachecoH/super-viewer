import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/SpinnerLoading";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {isLoading && <Spinner/>}
            <Navbar setIsLoading={setIsLoading}/>
            <h1>Estas en el dashboard</h1>
        </>
    );
}

export default Dashboard;
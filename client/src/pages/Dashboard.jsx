import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Dashboard() {
  const styles = {
    color: '#D3D3D3',
    backgroundColor: 'white'
  }
  const { user } = useContext(UserContext);
  return (
  <div className={styles.backgroundColor}> 
    <h1 className={styles.color}>Dashboard</h1>
    {!! user && (<h2> Hi {user.name}!</h2>)}
  </div>
  )
}

export default Dashboard;

import { ApolloProvider, InMemoryCache, ApolloClient, useQuery, gql} from '@apollo/client';
import GetMissions from './Components/GetMissions/GetMissions';
import GetTicket from './Components/GetTicket/GetTicket';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import GlobalLayout from './Components/Layout/GlobalLayout';


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL_NEW}`,
  cache: new InMemoryCache(),
});



function App() {
  return (
    <Router >
      <ApolloProvider client={client}> 
      <GlobalLayout>    
      <Routes>
        <Route path="/" element={<GetMissions/>} />
        <Route path="/ticket" element={<GetTicket />} />
      </Routes>
      </GlobalLayout>  
    </ApolloProvider>
    </Router>
    
  );
}

export default App;


import { ApolloProvider, InMemoryCache, ApolloClient, useQuery, gql} from '@apollo/client';
import GetMissions from './Components/GetMissions/GetMissions';


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}`,
  cache: new InMemoryCache(),
});



function App() {
  return (
      <ApolloProvider client={client}>
       <GetMissions/>
    </ApolloProvider>
    
  );
}

export default App;

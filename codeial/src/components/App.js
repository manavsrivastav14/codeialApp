import { useEffect } from 'react';
import { getPosts } from '../api';
function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('Response: ', response);
    };

    fetchPosts();
  }, []);
  return (
    <div className="App">
      <h3>Hello World</h3>
    </div>
  );
}

export default App;

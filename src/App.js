// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div>

// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React from 'react';
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// // } from 'react-router-dom'
// // import UsersList from './pages/UsersList';
// // // import BookmarkedUsers from './BookmarkedUsers';

// // const App = () => {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route exact path="/" component={UsersList} />
// //         {/* <Route exact path="/bookmarked" component={BookmarkedUsers} /> */}
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;


// import React from 'react';
// import {
//   Routes,
//   Route,
// } from 'react-router-dom'
// import UsersList from './pages/UsersList';

// const App = () => {
//   return (
//     <Routes>
//       <Route exact path="/" element={<UsersList />} />
//     </Routes>
//   );
// };

// export default App;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import UserList from './pages/UsersList';
import BookmarkedUsers from './pages/BookmarkedUsers';
import { store, persistor } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router ><Routes ><Route path="/" element={<UserList />} /><Route path="/bookmarkedusers" element={ <BookmarkedUsers />} /></Routes></Router>

       
      </PersistGate>
    </Provider>
  );
};

export default App;



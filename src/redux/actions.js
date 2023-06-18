export const toggleBookmark = (user) => ({
  type: 'TOGGLE_BOOKMARK',
  payload: user,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });

    try {
      const token = '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'; // Replace with your actual authentication token
      const response = await fetch('https://api.github.com/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data,"data");
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
    }
  };
};

  
  export const loadMoreUsers = () => ({
    type: 'LOAD_MORE_USERS',
    
  });
  
  export const refreshUsers = (callback) => {
    return async (dispatch) => {
      dispatch({ type: 'REFRESH_USERS_REQUEST' });
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        dispatch({ type: 'REFRESH_USERS_SUCCESS', payload: data });
        callback();
      } catch (error) {
        dispatch({ type: 'REFRESH_USERS_FAILURE', payload: error.message });
        callback();
      }
    };
  };
  
  export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
  });

  export const fetchUsersRequest = () => ({
    type: 'FETCH_USERS_REQUEST',
  });
  
  export const fetchUsersSuccess = (users) => ({
    type: 'FETCH_USERS_SUCCESS',
    payload: users,
  });
  
  export const fetchUsersFailure = (error) => ({
    type: 'FETCH_USERS_FAILURE',
    payload: error,
  });

  
  
  
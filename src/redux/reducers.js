const initialState = {
    users: [],
    bookmarkedUsers: [],
    searchQuery: '',
    loading: false,
    error: null,
    selectedUsers: [], // Add this line
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USERS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_USERS_SUCCESS':
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      case 'FETCH_USERS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

case 'TOGGLE_BOOKMARK':
  const { bookmarkedUsers } = state;
  const user = action.payload;
      const isBookmarked = bookmarkedUsers.find((bookmark) => bookmark.id === user.id);
      return {
        ...state,
        bookmarkedUsers: isBookmarked
          ? bookmarkedUsers.filter((bookmark) => bookmark.id !== user.id)
          : [...bookmarkedUsers, user],
      };



      case 'LOAD_MORE_USERS':
        // Implement logic to load more users if necessary
        return state;
      case 'REFRESH_USERS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'REFRESH_USERS_SUCCESS':
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      case 'REFRESH_USERS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'SET_SEARCH_QUERY':
        return {
          ...state,
          searchQuery: action.payload,
        };
        case 'ADD_TO_SELECTED':
          return {
            ...state,
            selectedUsers: [...state.selectedUsers, action.payload],
          };
        case 'REMOVE_FROM_SELECTED':
          return {
            ...state,
            selectedUsers: state.selectedUsers.filter((user) => user !== action.payload),
          };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  toggleBookmark,
  fetchUsers,
  loadMoreUsers,
  refreshUsers,
  setSearchQuery,
} from '../redux/actions';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Link } from 'react-router-dom';
import NoDataFound from '../components/NoDataFound';
import Loader from '../components/Loader';


const UsersList = ({
  users,
  bookmarkedUsers,
  searchQuery,
  loading,
  fetchUsers,
  perPage,
  toggleBookmark,
  setSearchQuery,
  refreshUsers,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [noofelement, setnoofelement] = useState(10);

  const handleToggleBookmark = (user) => {
    toggleBookmark(user);
  };

  const isBookmarked = (user) => {
    return !!bookmarkedUsers.find((bookmark) => bookmark.id === user.id);
  };


  const handleLoadMore = () => {
    setnoofelement(noofelement + noofelement)
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshUsers();
    } catch (error) {
      console.error('Error occurred while refreshing users:', error);
    }
    setIsRefreshing(false);
  };


  
  const handleSearch = (event) => {
    const query = event.target.value;
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        setSearchQuery(query);
      }, 300)
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.login && user.login.toLowerCase().includes(searchQuery?.toLowerCase?.())
  );

  const slice = filteredUsers.slice(0, noofelement);
  const hasMatchingUsers = slice.length > 0;



  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, perPage]);

  return (
    <div>

      <div className="container">
        <div className='d-flex mt-4'>
          <div>
            <input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div><Link to="/bookmarkedusers"><button className='btn btn-primary' style={{ marginLeft: "650px" }}> <BookmarkIcon />BookMarked Users</button></Link></div>
        </div>

        <div className="text-center fs-3 mt-3">Users</div>
        <PullToRefresh
          onRefresh={handleRefresh}

        >
          <table className="table table-hover table-bordered mt-3 w-75 ms-5 align-self-center" >
            <thead className="" style={{ backgroundColor: '#26abff', color: '#FFF' }}>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Bookmark</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    <Loader />
                  </td>
                </tr>
              ) : (
              slice.map((user) => (
                <tr>
                  <td>
                    <img src={user.avatar_url} alt={user.login} className="rounded-circle me-3 img-fluid img-thumbnail" style={{ width: "100px", height: "100px" }} />
                  </td>
                  <td>{user.login}</td>
                  <td>
                    <BookmarkIcon
                      onClick={() => handleToggleBookmark(user)}
                      style={{
                        cursor: 'pointer'
                      }}
                      color={isBookmarked(user) ? 'primary' : 'inherit'}
                    />
                  </td>
                </tr>
              ))
              )}

            </tbody>
          </table>
          
          {isRefreshing && (
            <div className="text-center mt-3">Loading...</div>
          )}
        </PullToRefresh >
        {!hasMatchingUsers && (
          <NoDataFound />
        )}
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({

  users: state.users,
  bookmarkedUsers: state.bookmarkedUsers,
  searchQuery: state.searchQuery,
  loading: state.loading,
  page: state.page,
  perPage: state.perPage,
  selectedUsers: state.selectedUsers, // Add this line
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUsers,
      toggleBookmark,
      setSearchQuery,
      loadMoreUsers,
      refreshUsers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

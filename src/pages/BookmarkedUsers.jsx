import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleBookmark, setSearchQuery } from '../redux/actions';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoDataFound from '../components/NoDataFound';




const BookmarkedUsers = ({ bookmarkedUsers, refreshUsers, toggleBookmark }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
    // eslint-disable-next-line
    const [noofelement, setnoofelement] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);


    const handleToggleBookmark = (user) => {
        toggleBookmark(user);
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

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refreshUsers();
        } catch (error) {
            console.error('Error occurred while refreshing users:', error);
        }
        setIsRefreshing(false);
    };


    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const startIndex = (page - 1) * noofelement;
    const endIndex = startIndex + noofelement;
    const filteredBookmarkedUsers = bookmarkedUsers
        .filter((user) => user.login.toLowerCase().includes(searchQuery))
        .slice(0, endIndex);
    return (
        <div>

            <div className="container">
                <div className='d-flex mt-4'>
                    <div><Link to="/"><button className='btn btn-primary' style={{ marginRight: "750px" }}><ArrowBackIcon />Back</button></Link></div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search users"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                </div>
                <div className="text-center fs-3 mt-3">BookMarked Users</div>
                <PullToRefresh
                    onRefresh={handleRefresh}

                >
                    <table className="table table-hover table-bordered mt-3 w-75 ms-5 align-self-center">
                        <thead className="" style={{ backgroundColor: '#26abff', color: '#FFF' }}>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Bookmark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(bookmarkedUsers, "filteredUsers")}
                            {filteredBookmarkedUsers.map((user) => (
                                <tr>
                                    <td>
                                        <img src={user.avatar_url} alt={user.login} className="rounded-circle me-3 img-fluid img-thumbnail" />
                                    </td>
                                    <td>{user.login}</td>
                                    <td>
                                        <BookmarkIcon
                                            onClick={() => handleToggleBookmark(user)}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            color={bookmarkedUsers.includes(user) ? 'primary' : 'inherit'}
                                        />
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    {isRefreshing && (
                        <div className="text-center mt-3">Loading...</div>
                    )}
                </PullToRefresh>
                {filteredBookmarkedUsers.length === 0 && (
                                
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
    bookmarkedUsers: state.bookmarkedUsers,
    searchQuery: state.searchQuery,
    selectedUsers: state.selectedUsers,

});


const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            //   fetchUsers,
            toggleBookmark,
            setSearchQuery,
            //   loadMoreUsers,
            //   refreshUsers,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedUsers);


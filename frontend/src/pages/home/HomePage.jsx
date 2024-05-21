import { useCallback, useEffect, useState } from "react"
import ProfileInfo from "../../components/profile-info/ProfileInfo"
import Repos from "../../components/repos/Repos"
import Search from "../../components/search/Search"
import SortRepos from "../../components/sort-repos/SortRepos"
import toast from "react-hot-toast"
import Spinner from './../../components/spinner-component/Spinner';

const HomePage = () => {
  const [userProfile,setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [sortType,setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback (
    async (username="Sanga-byte29") => {
      setLoading(true);
      try {
         const res = await fetch(`/api/users/profile/${username}`);
         const {repos,userProfile} = await res.json();
         console.log(userProfile, "user profile");
        repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(repos);
        setUserProfile(userProfile);
        console.log("userprofile:", userProfile);
        console.log("repos:", repos);

        setLoading(false);
  
  
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false);
      }
    },[]);


  useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);

  const onSearch = async (e,username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const {userProfile, repos} = await getUserProfileAndRepos(username);
    console.log("repos from onSearch", repos);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  }
  const onSort = (sortType) => {
    if(sortType === "recent"){
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    }
    else if(sortType === "start"){
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count);
    }
    else if(sortType === "forks"){
      repos.sort((a,b) => b.forks_count - a.forks_count)
    }
    setSortType(sortType);
    setRepos([...repos]);
  }




  return (
    <div className='m-4'>
      <Search onSearch={onSearch}/>
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {/* <ProfileInfo userProfile={userProfile} /> */}
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
        <Repos />
			</div>
    </div>
  )
}

export default HomePage
import { useContext, useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import UserContext from "../auth/UserContext";
import BuddyReadApi from "../api/api";
import BuddyReadList from "./BuddyReadList";
import LoadingSpinner from "../common/LoadingSpinner";
import InviteList from "./InviteList";
import Sidebar from "./Sidebar";
import NewBuddyRead from "../newbuddyread/NewBuddyRead";

/** Show page with list new buddyread search, invites, current, and completed buddyreads.
 *
 * On mount, loads buddyreads book search from API and a sidebar that changes what is
 * shown to users: search, invites, current, and completed.
 * 
 * When a pending buddy read book title image is clicked, 
 * book information is shown in BookModal. When a completed or current buddy
 * read is clicked, it takes users to a new page with book details. 
 *
 * This is routed to at /dashboard
 *
 * AppRoutes -> Dashboard -> { NewBuddyRead, InviteList, BuddyReadList }
 */

const Dashboard = () =>  {
    const {currentUser} = useContext(UserContext);
    const [currentBuddyReads, setCurrentBuddyReads] = useState([]);
    const [completedBuddyReads, setCompletedBuddyReads] = useState([]);
    const [infoLoaded, setInfoLoaded] = useState(false)
    const [showComponent, setShowComponent] = useState({
        add: true, 
        invites: false, 
        current: false, 
        completed: false
    })

    useEffect(() => {    
        async function getBuddyReadData() {
        try {
            const buddyReads = await BuddyReadApi.getBuddyReads(currentUser.id);
            const invites = await BuddyReadApi.getInvites(currentUser.id);
            setCurrentBuddyReads([  ...buddyReads.filter(br => br.status === 'in-progress'), 
                                    ...invites.filter(br => br.status === 'in-progress')]);
            setCompletedBuddyReads([...buddyReads.filter(br => br.status === 'completed'), 
                                    ...invites.filter(br => br.status === 'completed')]);
        } catch (err) {
            console.error("Error loading books", err);
        }
            setInfoLoaded(true)
        }

        setInfoLoaded(false)
        getBuddyReadData();
    }, [currentUser.id]);

    if (!infoLoaded) return <LoadingSpinner/>

    return (
        <Box sx={{ width: '100%' }} align='center'>
            <Stack direction={{xs: 'column', sm: 'row'}}  justifyContent="space-between">
                <Box flex={1} p={1}>
                    <Sidebar setShowComponent={setShowComponent}/>
                </Box>

                <Box flex={7} p={1}>
                    {showComponent.add ? 
                        <NewBuddyRead/> 
                        : null}
                    {showComponent.invites ? 
                            <InviteList
                                setCurrentBuddyReads={setCurrentBuddyReads}/>
                        : null}
                    {showComponent.current ? 
                        <BuddyReadList 
                            buddyReadList={currentBuddyReads} 
                            type="Current"/> 
                        : null}
                    {showComponent.completed ? 
                        <BuddyReadList 
                            buddyReadList={completedBuddyReads} 
                            type="Completed"/> 
                        : null}
                </Box>   
            </Stack>

 
        </Box>
    )
}

export default Dashboard;

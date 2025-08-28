import { Box, Container, CssBaseline, Typography} from "@mui/material";
import {useState} from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/types/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activites, isPending} = useActivities();


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activites!.find(x => x.id ===id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }


  return (
    <Box sx = {{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
        {!activites || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
        <ActivityDashboard 
          activities={activites}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity = {selectedActivity} 
          editMode = {editMode}
          openForm = {handleOpenForm}
          closeForm = {handleFormClose}
          />
        )}
        
      </Container>
    </Box>
  )
}

export default App

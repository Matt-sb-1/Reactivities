import { Box, Container, CssBaseline} from "@mui/material";
import { useEffect, useState} from "react"
import axios from "axios"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";

function App() {
  const [activites, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {}
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activites.find(x => x.id ===id));
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activites.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = {...activity, id: activites.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activites, newActivity])
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    setActivities(activites.filter(x => x.id !== id))
  }

  return (
    <Box sx = {{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
        <ActivityDashboard 
          activities={activites}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity = {selectedActivity} 
          editMode = {editMode}
          openForm = {handleOpenForm}
          closeForm = {handleFormClose}
          submitForm = {handleSubmitForm}
          deleteActivity = {handleDelete}
          />
      </Container>
    </Box>
  )
}

export default App

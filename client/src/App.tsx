import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState} from "react"
import axios from "axios"

function App() {
  const [activites, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {}
  }, [])

  return (
    <>
      <Typography variant = 'h3'>Reactivities</Typography>
      <List>
        {activites.map((activity) => (
          <ListItem key = {activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App

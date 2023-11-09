import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import ReminderList from './Components/ReminderList'
import Reminder from './Models/Reminders'
import ReminderServices from './Services/Reminder'
import NewReminder from './Components/NewReminder'

// const reminders: Reminder[] = [
//   {id: 1, title: 'Reminder1'}
// ]
//this got copied into the end of the useState statement, delete the rest

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    loadReminders();  
  }, [])

  const loadReminders = async () => {
    setIsLoading(true);
    try {
    const reminders = await ReminderServices.getReminders();
    setReminders(reminders);
    } catch(error) {
      setError('Error loading reminders');
    }
    setIsLoading(false);
  }

  const removeReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const addReminder = async (title: string) => {
    try {
    const newReminder = await ReminderServices.addReminders(title);
    setReminders([newReminder, ...reminders]);
    } catch(error){
      setError('Error adding reminder');
    }
  }

  return (
    <>
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <ReminderList items={reminders} onRemoveReminder={(removeReminder)} />   
      {isLoading && <div className="spinner-border"></div>}
      {error && <div className='error.message'>{error}</div>}
    </div>
    </>
  )
}

export default App


//style it

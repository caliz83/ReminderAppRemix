import { useState } from "react";

interface NewReminderProps {
    onAddReminder: (title: string) => void
}

const NewReminder = ({onAddReminder}: NewReminderProps) => {

    const [title, setTitle] = useState('')

    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        if(!title) return; //simple data validation: if nothing in form, it won't add the blank item
        onAddReminder(title);
    }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title"></label>
      <input value={title} onChange={event => setTitle(event.target.value)} id="title" type="text" className="form-control" />
      <button type="submit" className="btn btn-primary rounded-pill my-4 d-flex align-content-end">Add Reminder</button>
    </form>
  );
};

export default NewReminder;

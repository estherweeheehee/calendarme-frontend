import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateNote from "../components/CreateNote";
import ShowNotes from "../components/ShowNotes";
import months from "../data/months";
import calendar from "../data/calendar";
import Dates from "../components/Dates";
import moment from "moment";
import Modal from "../components/Modal";
import MonthlyTags from "../components/MonthlyTags";

const View = () => {
  const { month } = useParams();
  // const [mm, setMM] = useState(month);
  let navigate = useNavigate();
  const days = calendar[month];

  const [display, setDisplay] = useState([]);
  const [nil, setNil] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalNote, setModalNote] = useState({});

  const [tagsData, setTagsData] = useState([]);

  const openModal = (note) => {
    setModalNote(note);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteNote = (i) => {
    const newArr = display.filter((note, index) => note.id !== i);
    setDisplay(newArr);
    // setModalIsOpen(false)
  };

  const editNote = (i, note) => {
    const pos = display.map((entry) => entry.id).indexOf(i);
    setDisplay([...display.slice(0, pos), note, ...display.slice(pos + 1)]);
  };

  const fetchData = () => {
    fetch(`https://calendarme-backend.herokuapp.com/api/${month}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) {
          setNil(true);
          return;
        } else {
          setDisplay(data.data);

          setNil(false);
          return;
        }
      });
  }

  useEffect(() => {
    fetch(`https://calendarme-backend.herokuapp.com/api/${month}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) {
          setNil(true);
          return;
        } else {
          setDisplay(data.data);

          setNil(false);
          return;
        }
      });
  }, [month]);

  // const NotesContainer = () => {
  //     if (nil === true) {
  //         return;
  //     }
  //     const result = []

  //     for (let i =0; i < display.length; i++) {
  //         result.push(
  //             <ShowNotes
  //                 key={i}
  //                 i={i}
  //                 index={display[i]["id"]}
  //                 date={display[i]["date"]}
  //                 title={display[i]["title"]}
  //                 post={display[i]["post"]}
  //                 tag={display[i]["tag"]}
  //                 removeNote={removeNote}
  //                 wholeNote={display[i]}
  //                 updateNote={updateNote}
  //             />

  //         )
  //     }
  //     return result
  // }

  const addNote = (mm, note) => {
    
    if (mm === month) {
      
      fetchData()
    }
  };

  // const removeNote = (i) => {
  //     const newArr = display.filter((note, index) => i !== index)
  //     setDisplay(newArr)
  // }

  // const updateNote = (i, edited) => {
  //     setDisplay([
  //         ...display.slice(0, i),
  //         edited,
  //         ...display.slice(i + 1)
  //     ])
  // }

  const DisplayMonth = (month) => {
    for (let entry in months) {
      if (month === entry) {
        return months[entry];
      }
    }
  };

  const MakeCalendar = () => {
    const arr = [];
    for (let i = 1; i < days + 1; i++) {
      let day = i.toString();
      if (day.length < 2) {
        day = "0" + day;
      }

      const notes = display.filter(
        (entry) => day === moment(entry.date).format("DD")
      );
      arr.push(
        <Dates
          i={i}
          key={i}
          day={day}
          nil={nil}
          openModal={openModal}
          notes={notes}
        />
      );
    }

    return arr;
  };

  const GenerateTags = () => {
    if (nil === true) {
      return null;
    } else {
      const tags = [];
      display.forEach((entry) => {
        if (!tags.includes(entry.tag)) {
          tags.push(entry.tag);
        }
      });
      return <MonthlyTags tags={tags} />;
    }
  };

  return (
    <>
      {modalIsOpen === true ? (
        <Modal
          closeModal={closeModal}
          deleteNote={deleteNote}
          modalNote={modalNote}
          editNote={editNote}
        />
      ) : null}

      <h1>{DisplayMonth(month).toUpperCase()}</h1>
      <div className="notesContainer">
        <MakeCalendar />
        {/* <NotesContainer /> */}
      </div>

      <GenerateTags />
      <CreateNote addNote={addNote} />
    </>
  );
};

export default View;

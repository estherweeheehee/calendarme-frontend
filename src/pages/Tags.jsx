import { useEffect, useState } from "react";
import AllTags from "../components/Tags/AllTags";
import IndivTags from "../components/Tags/IndivTags";

const Tags = () => {
  let params = (new URL(document.location)).searchParams;
  let tagTerm = params.get("tag");
  const [tag, setTag] = useState(tagTerm)
  const [nil, setNil] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  const [allTags, setAllTags] = useState({});

  const changeTag = (term) => {
    setTag(term)
    
  }

  useEffect(() => {
    fetch(`https://calendarme-backend.herokuapp.com/retrievealltags`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.data) {
            setNil(true);
            return;
          } else {
            const obj = {}
            data.data.forEach((tag) => {
                if (obj[tag] === undefined) {
                    obj[tag] = 1;
                } else {
                    obj[tag] += 1;
                }
            }
            )
            setAllTags(obj)
          }
        });
    
    if (tagTerm) {
      fetch(`https://calendarme-backend.herokuapp.com/searchtags/${tagTerm}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.data) {
            setNil(true);
            return;
          } else {
            setTagsData(data.data);
            setNil(false);
          }
        });
    } 
  }, [tagTerm]);

  const DisplayTags = () => {
    if (nil === true) {
      return null;
    } else {
      return tagsData.map((note, index) => (
        <IndivTags key={index} note={note} />
      ));
    }
  };

  return (
    <>
      <h1 className="allTagsHeader">ALL TAGS</h1>
      <p>Click to view events tagged under each tag</p>
        <AllTags allTags={allTags} changeTag={changeTag}/>

      {tagTerm ? (
        <>
          <h3>SHOWING NOTES UNDER "{tagTerm}":</h3>
          <DisplayTags />
        </>
      ) : null}
    </>
  );
};

export default Tags;

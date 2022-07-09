import { useEffect, useState } from "react";
import AllTags from "../components/Tags/AllTags";
import IndivTags from "../components/Tags/IndivTags";

const Tags = () => {
  let params = new URL(document.location).searchParams;
  let tagTerm = params.get("tag");
  const [nil, setNil] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  const [allTags, setAllTags] = useState({});

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
  }, []);

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
      <h1>ALL TAGS</h1>
        <AllTags allTags={allTags}/>

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

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";


export const ViewHymn = () => {
  const { id, book } = useParams();

  const [verses, setVerses] = useState([]);
  const location = useLocation();

  const search = () => {
    fetch(`/api/getVerse?book=${book}&number=${id}`)
      .then(async (response) => {
        const data = await response.json();
        setVerses(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(search, [id, book]);


  if (verses.length == 0) {
    return <div>Record not found</div>;
  }

  console.log(location)
  
  return (
    <div className="mt-4 mx-auto w-2/3 md:w-1/2">
       <div className="mx-auto w-full md:w-2/3">
       <h1 className="font-bold text-2xl mb-2">
        {book}: {verses[0].songtitle}{" "}
      </h1>

      <div>
        <div className="mb-2">
        {verses?.map((v, index) => {
          return (
            <p className="hover:underline">
              <a href={`#V${v.verse_id}`}>Jump to Verse {v.verse_id}</a>
            </p>
          );
        })}
        </div>


        {verses?.map((v, index) => {
          return (
            <div key={index}>
              <h2 className="font-semibold underline mt-4" id={`V${v.verse_id}`}> Verse {v.verse_id}</h2>
              <p className="w-full md:w-2/3">{v.verse}</p>
            </div>
          );
        })}
      </div>
       </div>

    </div>
  );
};

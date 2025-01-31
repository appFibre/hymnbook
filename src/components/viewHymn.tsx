import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

export const ViewHymn = () => {
  const { id, book } = useParams();

  const [verses, setVerses] = useState<{songtitle: string, verse_id: any; verse: string; }[]>([]);


  const search = () => {
    fetch(`/api/getVerse?number=${id}`)
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
  
  return (
    <div className="mt-4 mx-auto w-2/3 md:w-1/2">
      <div className="mx-auto w-full md:w-2/3">
        <h1 className="font-bold text-2xl mb-2">{verses[0].songtitle} </h1>

        <div>
          {verses?.sort((v, u) => parseFloat(v.verse_id % 10 == 0 ? v.verse_id + 1.5 : v.verse_id) - parseFloat(u.verse_id % 10 == 0 ? u.verse_id + 1.5 : u.verse_id)).map((v, index) => {
            return (
              <div key={index}>
                 <h2 className="font-semibold underline mt-4" id={`V${v.verse_id}`}>
                  {" "}
                  {v.verse_id === 99 ? "" : v.verse_id % 10 == 0 ? "Chorus" : v.verse_id}
                </h2>
                <p className="w-full md:w-2/3" dangerouslySetInnerHTML={{ __html: v.verse }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

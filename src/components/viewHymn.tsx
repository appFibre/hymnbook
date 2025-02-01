import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

export const ViewHymn = () => {
  const { id, book } = useParams();

  const [song, setSong] = useState<{song_id:string, title: string, language: string, verses: {verse_id: any; verse: string; }[], prev: string, next: string}>();
  


  const search = () => {
    fetch(`/api/getSong?number=${id}`)
    .then(async (response) => {
      const s = await response.json();
      fetch(`/api/getVerse?number=${id}`)
      .then(async (response) => {
        const verses = await response.json();
        setSong({...s, verses});
      })
      .catch(alert);
    }).catch(alert);
  };

  useEffect(search, [id, book]);

  if (song == undefined || song.verses.length == 0) {
    return <div>Record not found</div>;
  }
  
  return (
    <div className="mt-4 mx-auto w-2/3 md:w-1/2">
      <div className="mx-auto w-full md:w-2/3"  style={{background: "#FAFAFA", border: "1px solid #EEE", padding: 10}}>
        <center>
        <h1 className="font-bold text-2xl mb-2">{song.title}</h1>
          </center>

        <div>
          {song.verses?.sort((v, u) => parseFloat(v.verse_id % 10 == 0 ? v.verse_id + 1.5 : v.verse_id) - parseFloat(u.verse_id % 10 == 0 ? u.verse_id + 1.5 : u.verse_id)).map((v, index) => {
            return (
              <div key={index}>
                 <h2 className={"font-semibold underline mt-4" + ( (parseFloat(v.verse_id) < 10) ? "" : " disabled")} id={`V${v.verse_id}`}>
                  {" "}
                  {v.verse_id === 99 ? "" : v.verse_id % 10 == 0 ? "Chorus" : v.verse_id}
                </h2>
                <p className={parseFloat(v.verse_id) < 10 ? "w-full md:w-2/3" : " disabled"} dangerouslySetInnerHTML={{ __html: v.verse }} />
                <br />
              </div>
            );
          })}
        </div>

        <center>        
          <p><a href={`./${song.prev}`}>{song.prev > ''?'<>< ':''} </a><b style={{paddingLeft: 20, paddingRight: 20}}>{song.song_id}</b> <a href={`./${song.next}`}>{song.next?' ><>':''}</a></p>
        </center>        
      </div>
    </div>
  );
};

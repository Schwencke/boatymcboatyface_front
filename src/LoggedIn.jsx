import { useEffect, useState } from "react"


export default function LoggedIn({facade}) {
    const [dataFromServer, setDataFromServer] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Loading..")
    useEffect(() => { facade.fetchData('info', getDataFromServer)
        .catch(err => {
            if(err.status){
                err.fullError.then(e=> setErrorMsg(e.code + e.message))
            }else console.log("Network Error")
        })
        ;}, [facade])

        const getDataFromServer = (data) => {
          if (data != null){
            setErrorMsg("Server is up and ready!")
            setDataFromServer(true)
          } else setErrorMsg("Server is down!!!!!")
          setDataFromServer(false)
        }
   
    return (
      <div>
        {!dataFromServer ? <div><p>Server up and ready</p><div className="green"></div></div> : <div className="red"></div>}
      </div>
    )
   
  }
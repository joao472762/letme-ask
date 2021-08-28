import copyImg from '../assets/images/copy.svg'

import '../styles/roomCode.scss'

type  RoomcodeProps = {
    code: string
} 

export function RoomCode(props: RoomcodeProps){
    
    function copyRoomCodeToClipBoard(){

        navigator.clipboard.writeText(props.code)
    }
    
    return(
        <button className="roomCode" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="" />
            </div>
            <span> {props.code} </span>
        </button>);
}


import SendServer from "@/entities/logs/SendServerLogs";
import WindowLogs from "./WindowLogs";

const ServerLogsComponent = () => {
    return (
        <>
        <div style={{marginLeft: "50px"}}>
        <SendServer />
        <WindowLogs />
        </div>
        </>
    )
}

export default ServerLogsComponent;
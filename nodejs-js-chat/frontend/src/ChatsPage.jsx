import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic(
        'b44c00f5-bd44-41f7-b760-c7b9d6bd9fae',
        props.user.username,
        props.user.secret
    );
    return (
    <div style={{ height: '100vh' }}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps} style={{ height: '100%' }} />
    </div>
    )
}

export default ChatsPage
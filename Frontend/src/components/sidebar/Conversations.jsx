
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import {getRandomEmoji} from '../../utils/emojis'
const Conversations = () => {
const {loading, conversations} =	useGetConversations()
console.log(conversations);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((convo, idx)=>{
			return (

				<Conversation key={convo._id} conversation={convo} emoji={getRandomEmoji()} lastIdx={idx-convo.length-1}/>
			)	
			})}
		{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
			</div>
		);
};
export default Conversations;

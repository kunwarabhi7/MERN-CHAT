
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
const {loading,conversation} =	useGetConversations()
console.log(conversation);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
		</div>
	);
};
export default Conversations;

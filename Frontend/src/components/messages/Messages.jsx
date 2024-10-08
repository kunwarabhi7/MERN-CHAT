import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";


const Messages = () => {
	const {loading,messages} = 	useGetMessages();
	console.log(messages);
	
		return (
	<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && (
				messages.map((mes)=>(
				
						<Message key={mes._id} message={mes}/>
					))
			)}
	
				{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
				{!loading && messages.length === 0 && (
					<p className='text-center'>Send a message to start the conversation</p>
				)}
			</div>
		);
};
export default Messages;

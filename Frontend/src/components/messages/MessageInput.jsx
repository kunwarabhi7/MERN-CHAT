import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {

	const [textMessage,setTextMessage] = useState("")
const{sendMessage,loading} =	useSendMessage();
	const handleSubmit =async (e) => {
        e.preventDefault();
		if(!textMessage) return;
	await	sendMessage(textMessage);
		setTextMessage("")
    };
	return (
		<form onSubmit={handleSubmit} className='px-4 my-3'>
			<div className='w-full relative'>
				<input
				value={textMessage} 
				onChange={(e)=>setTextMessage(e.target.value)}

					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
				{loading ? (<span className="loading loading-spinner loading-sm"></span>):<BsSend />} 
				
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

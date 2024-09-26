import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
const {logout,loading} = 	useLogout()

	return (
		<div className='mt-auto'>
			{!loading ? (			<BiLogOut  className='w-6 h-6 text-white cursor-pointer' />) : (<span className="loading loading-spinner loading-sm"></span>
)}

		</div>
	);
};
export default LogoutButton;
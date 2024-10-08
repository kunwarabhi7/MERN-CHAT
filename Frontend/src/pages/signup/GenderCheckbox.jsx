const GenderCheckbox = ({onCheckboxChange , selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input checked={selectedGender==='male'} onChange={() => onCheckboxChange('male')} type='checkbox' className='checkbox border-slate-900' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900' checked={selectedGender==='female'} onChange={() => onCheckboxChange('female')}/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
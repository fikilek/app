import React from "react";
import { GiTennisBall } from "react-icons/gi";
import { ClipLoader } from "react-spinners";

const FormBtn = ({ isPending, btnName }) => {
	// console.log(`isPending`, isPending)
	return (
		<div className={`${btnName}-btn`}>
			{isPending ? (
				<button type="button" className="form-btn submit pending" disabled>
					<ClipLoader
						color="orange"
						loading={isPending}
						size={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</button>
			) : (
				<button type={`${btnName}`} className={`form-btn ${btnName}`}>
					{btnName}
				</button>
			)}
		</div>
	);
};

export default FormBtn;

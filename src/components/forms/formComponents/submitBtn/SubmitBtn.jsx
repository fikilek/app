import React from 'react'
import { ClipLoader } from 'react-spinners';

const SubmitBtn = ({ isPending }) => {
	// console.log(`isPending`, isPending)
  return (
			<div className="submit-btn">
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
					<button className="form-btn submit">
						Submit
					</button>
				)}
			</div>
		);
}

export default SubmitBtn
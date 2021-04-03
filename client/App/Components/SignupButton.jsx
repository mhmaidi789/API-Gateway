import React from 'react';

const SignupButton = () => {
    function handleClick(e) {
        e.preventDefault();
      console.log('button working!')
    }
    return(
       <button className="signup" onClick={handleClick}><i className="fas fa-user-plus"></i>
       </button>
        
    )
}

export default SignupButton

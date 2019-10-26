import React from 'react'

const FirebaseContext = React.createContext(null);

//Allows us to make any component a FirebaseContext Consumer
export const withFirebase = Component => props => {
    return(
        <FirebaseContext.Consumer>
            {firebase => <Component {...props} firebase={firebase}/>}
        </FirebaseContext.Consumer>
    );
};

export default FirebaseContext;
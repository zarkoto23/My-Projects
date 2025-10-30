import { Component } from "react";
import AdminComments from "./admin-comments/AdminComments";
import { UserContext } from "../../contexts/UserContext";
import ErorrBoundry from "../../eroor-boundry/ErrorBoundry";

export default class Admin extends Component {
  render() {
    return (
      <ErorrBoundry>

        
      <UserContext.Consumer>
        {(context) => (
          <section style={{ color: "white" }}>
            <h1 >Admin SectiDDDDon</h1>
            <h2>Hello {context.email} </h2>
            <AdminComments />
          </section>
        )}
      </UserContext.Consumer>

      </ErorrBoundry>
    );
  }
}

// export default function Admin() {
//   return (
//     <>
//       <h1 style={{ backgroundColor: "white" }}>Admin Section</h1>

//       <p>This is admin pandel</p>
//     </>
//   );
// }

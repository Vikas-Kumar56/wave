import React from "react";
import ManageBrand from "./ManageBrand";
import ManageWood from "./ManageWood";
import UserLayout from "../../../HOC/User";

class ManageCategories extends React.Component {
  render() {
    return (
      <UserLayout>
        <ManageBrand />
        <ManageWood />
      </UserLayout>
    );
  }
}

export default ManageCategories;
